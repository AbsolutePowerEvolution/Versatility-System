var Sammy = require('sammy');
var NumberPeriodStart = [
  ['07:10:00', '08:10:00', '09:10:00'],
  ['10:10:00', '11:10:00', '12:10:00'],
  ['13:10:00', '14:10:00', '15:10:00'],
  ['16:10:00', '17:10:00', '18:10:00'],
  ['19:10:00', '20:10:00', '21:10:00']
];
var NumberPeriodEnd = [
  ['08:00:00', '09:00:00', '10:00:00'],
  ['11:00:00', '12:00:00', '13:00:00'],
  ['14:00:00', '15:00:00', '16:00:00'],
  ['17:00:00', '18:00:00', '19:00:00'],
  ['20:00:00', '21:00:00', '22:00:00']
];
var EngilishPeriodStart = [
  ['07:15:00', '08:45:00'],
  ['10:15:00', '11:45:00'],
  ['13:15:00', '14:45:00'],
  ['16:15:00', '17:45:00'],
  ['19:15:00', '20:45:00']
];
var EnglishPeriodEnd = [
  ['08:30:00', '10:00:00'],
  ['11:30:00', '13:00:00'],
  ['14:30:00', '16:00:00'],
  ['17:30:00', '19:00:00'],
  ['20:30:00', '22:00:00']
];
var UserPeriodStart = [
  ['07:00:00', '07:30:00', '08:00:00', '08:30:00', '09:00:00', '09:30:00'],
  ['10:00:00', '10:30:00', '11:00:00', '11:30:00', '12:00:00', '12:30:00'],
  ['13:00:00', '13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00'],
  ['16:00:00', '16:30:00', '17:00:00', '17:30:00', '18:00:00', '18:30:00'],
  ['19:00:00', '19:30:00', '20:00:00', '20:30:00', '21:00:00', '21:30:00']
];
var UserPeriodEnd = [
  ['07:30:00', '08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00'],
  ['10:30:00', '11:00:00', '11:30:00', '12:00:00', '12:30:00', '13:00:00'],
  ['13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00'],
  ['16:30:00', '17:00:00', '17:30:00', '18:00:00', '18:30:00', '19:00:00'],
  ['19:30:00', '20:00:00', '20:30:00', '21:00:00', '21:30:00', '22:00:00']
];
var LoanTable;
var LoanTablePage;

Sammy('#main', function() {
  this.get('#/user/loan', function(context) {
    context.loadPartials({menu: '/templates/user/menu.ms'})
      .partial('/templates/user/loan.ms')
      .then(function() {
        var picker = new Pikaday({
          field: document.getElementById('datepicker'),
          bound: false,
          container: document.getElementById('datepicker_container'),
          format: 'YYYY-MM-DD'
        });

        loanDataEvent();
      });
  });
});

function loanDataEvent() {
  $('#datepicker').unbind('change');
  $('#datepicker').change(function() {
    var request = {};
    request.date = $(this).val();
    console.log(request.date);

    $.get('/api/user/property/classrooms', request, function(result) {
      LoanTablePage = 0;
      LoanTable = [];
      var i;
      for(i = 0; i < result.length; i++) {
        if(result[i].loan_classroom != 0) {
          LoanTable.push(result[i]);
        }
      }
      console.log(LoanTable);
      produceClassroomStatus();
    });
  });

  $('#loan_classroom').unbind('click');
  $('#loan_classroom').click(function() {
    var request = {};

    $.post('/api/user/loan/create', request, function(result) {
      console.log(result);
    });
  });
}

function produceClassroomStatus() {
  var i;
  var j;
  var k;
  var temp;
  var group;
  var selectedDay = new Date($('#datepicker').val());
  var began;
  var ended;

  // Empty Html
  $('.content1, .content2, .content3, .content4, .content5')
    .find('div')
    .remove();

  for(i = (LoanTablePage * 5), j = 0; (i < LoanTable.length) && (j < 5); i++, j++) {
    for(k = 0; k < LoanTable[i].loan_classroom.length; k++) {
      console.log('here');
      // examine selected day's status
      began = new Date(LoanTable[i].loan_classroom[k].date_began_at);
      ended = new Date(LoanTable[i].loan_classroom[k].date_ended_at);
      if((LoanTable[i].loan_classroom[k].time_began_at != null) &&
          (began <= selectedDay && selectedDay <= ended)) {

        temp = LoanTable[i].loan_classroom[k].time_began_at.split(':');
        group = groupTool(temp[1]);

        switch(group){
          case 1: {// NumberPeriod
            break;
          }
          case 2: {// EnglishPeriod
            break;
          }
          case 3: {// UserPeriod
            began = matchTool(LoanTable[i].loan_classroom[k].time_began_at, UserPeriodStart);
            ended = matchTool(LoanTable[i].loan_classroom[k].time_ended_at, UserPeriodEnd);
            console.log('began = ' + began);
            console.log('ended = ' + ended);

            produceTable(group, began, ended, j);
            break;
          }
        }
      }
    }
  }
}

function produceTable(group, began, ended, contentIndex) {
  var i;
  var j;
  var perLineLength;
  var filedIndex;
  var parseIndex;
  var labelFront;
  var labelAfter;

  switch(group) {
    case 1: {
      perLineLength = 3;
      labelFront = '<div class="number_container number_period';
      labelAfter = '"></div>';
      break;
    }

    case 2: {
      perLineLength = 2;
      labelFront = '<div class="english_container english_period';
      labelAfter = '"></div>';
      break;
    }

    case 3: {
      perLineLength = 6;
      labelFront = '<div class="user_container user_period';
      labelAfter = '"></div>';
      break;
    }
  }

  // Parse Html
  for(i = began, j = 0; j <= (ended - began); i++, j++) {
    filedIndex = Math.floor(i / perLineLength) + 1;
    parseIndex = (i % perLineLength) + 1;
    console.log('filedIndex = ' + filedIndex);
    console.log('parseIndex = ' + parseIndex);

    $('#table_filed' + filedIndex)
      .find('.content' + contentIndex)
      .append(labelFront + parseIndex + labelAfter);
  }
}

function matchTool(time, table) {
  var i;
  var j;
  var result;

  for(i = 0; i < table.length; i++) {
    for(j = 0; j < table[i].length; j++) {
      if(time === table[i][j]) {
        result = (i * table[i].length) + j;
        break;
      }
    }
  }

  return result;
}

function groupTool(value) {
  switch(value) {
    case '10': {// NumberPeriod
      return 1;
    }
    case '15': // EnglishPeriod
    case '45': {
      return 2;
    }
    default: {// UserPeriod
      return 3;
    }
  }
}
