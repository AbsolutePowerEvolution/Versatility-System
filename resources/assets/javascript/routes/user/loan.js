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
var EnglishPeriodStart = [
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
var LoanTable; // Table Data
var LoanTablePage;
var LoanType; // short or long
var LoanTimeType; // number, english, user
var LoanHistory; // History Data
var NowPage;
var AllPage;

Sammy('#main', function() {
  var time = {};

  this.get('#/user/loan', function(context) {
    context.time = {};

    context.time.numberPeriodStart = function() {
      var result = [];
      var data = _.flattenDeep(NumberPeriodStart);
      var i;
      for(i = 0; i < data.length; i++) {
        result[i] = {};
        result[i].index = i;
        result[i].time = data[i];
      }

      return result;
    };
    context.time.numberPeriodEnd = function() {
      var result = [];
      var data = _.flattenDeep(NumberPeriodEnd);
      var i;

      for(i = 0; i < data.length; i++) {
        result[i] = {};
        result[i].index = i;
        result[i].time = data[i];
      }

      return result;
    };
    context.time.englishPeriodStart = function() {
      var result = [];
      var data = _.flattenDeep(EnglishPeriodStart);
      var i;
      for(i = 0; i < data.length; i++) {
        result[i] = {};
        result[i].index = i;
        result[i].time = data[i];
      }

      return result;
    };
    context.time.englishPeriodEnd = function() {
      var result = [];
      var data = _.flattenDeep(EnglishPeriodEnd);
      var i;

      for(i = 0; i < data.length; i++) {
        result[i] = {};
        result[i].index = i;
        result[i].time = data[i];
      }

      return result;
    };
    context.time.userPeriodStart = function() {
      var result = [];
      var data = _.flattenDeep(UserPeriodStart);
      var i;
      for(i = 0; i < data.length; i++) {
        result[i] = {};
        result[i].index = i;
        result[i].time = data[i];
      }

      return result;
    };
    context.time.userPeriodEnd = function() {
      var result = [];
      var data = _.flattenDeep(UserPeriodEnd);
      var i;

      for(i = 0; i < data.length; i++) {
        result[i] = {};
        result[i].index = i;
        result[i].time = data[i];
      }

      return result;
    };
    context.loadPartials({menu: '/templates/user/menu.ms'})
      .partial('/templates/user/loan.ms')
      .then(function() {
        // bind Event
        loanButtonEvent();
        loanDataEvent();
        userLoanInitEvent();

        // new inline display calendar
        var picker = new Pikaday({
          field: document.getElementById('datepicker'),
          bound: false,
          container: document.getElementById('datepicker_container'),
          format: 'YYYY-MM-DD'
        });
      });
  });
});

function userLoanInitEvent() {
  $('#screen_classroom').click();
  $('.modal #user_btn').click();
  $('.modal #short').click();

  var request = {};
  request.date = moment(new Date()).format('YYYY-MM-DD');

  $.get('/api/user/property/classrooms', request, function(result) {
    console.log(result);
    var i;
    var text;

    for(i = 0; i < result.length; i++) {
      text =  '<option value=' + result[i].id + '>';
      text += result[i].name;
      text += '</option>';

      $('.modal')
        .find('#classroom')
        .find('option:last')
        .after(text);
    }

    loanMaterializeEvent();
  });
}

function loanMaterializeEvent() {
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
}

function initModal() {
  $('.modal').find('#input[name="start_date"]').val('');
  $('.modal').find('#input[name="end_date"]').val('');
  $('.modal').find('input[type="checkbox"]').prop('checked', false);
  $('.modal').find('select')
    .find('option:nth-of-type(2)')
    .prop('selected', true);
  $('.modal').find('select').material_select();
}

function loanButtonEvent() {
  var modalTarget;
  var switchTimeTarget;
  $('#main').find('.modal-trigger')
    .on('click', function(event) {
      if($(this).data('button') == 'add') {
        initModal();
      }

      $('#materialize-lean-overlay-30').css('display', 'block');
      modalTarget = $(this).data('modal_target');
      $('#' + modalTarget).fadeIn();
    });

  $('#main').find('.modal-close, #materialize-lean-overlay-30')
    .on('click', function(event) {
      $('#materialize-lean-overlay-30').css('display', 'none');
      $('#' + modalTarget).fadeOut();
    });

  $('#screen_classroom').unbind('click');
  $('#screen_classroom').click(function() {
    $('#loan_container').show();
    $('#history_container').hide();
    $('.modal').find('.belong_loan').show();
    $('.modal').find('.belong_history').hide();
  });

  $('#screen_history').unbind('click');
  $('#screen_history').click(function() {
    $('#history_container').show();
    $('#loan_container').hide();
    $('.modal').find('.belong_loan').hide();
    $('.modal').find('.belong_history').show();

    NowPage = 1;
    getLoanHistory();
  });

  $('.modal #short').unbind('click');
  $('.modal #short').click(function() {
    LoanType = 1;
    $(this).parent()
      .find('button')
      .removeClass('active');
    $(this).addClass('active');
    $('.modal .long').hide();
    $('.modal .short').show();
  });

  $('.modal #long').unbind('click');
  $('.modal #long').click(function() {
    LoanType = 2;
    $(this).parent()
      .find('button')
      .removeClass('active');
    $(this).addClass('active');
    $('.modal .short').hide();
    $('.modal .long').show();
  });

  $('.modal .switch_time').unbind('click');
  $('.modal .switch_time').click(function() {
    $(this).parent()
      .find('button')
      .removeClass('active');
    $(this).addClass('active');

    switchTimeTarget = $(this).data('switch_time_target');
    $('.modal .time_container').hide();
    $('.modal .' + switchTimeTarget).show();

    if(switchTimeTarget == 'user_period') {
      LoanTimeType = 1;
    }else if(switchTimeTarget == 'number_period') {
      LoanTimeType = 2;
    }else {
      LoanTimeType = 3;
    }
  });

  $('.history_btn').unbind('click');
  $('.history_btn').click(function() {
    var id = $(this).data('loan_id');
    InsertDataToModal(id);
  });
}

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
    }).fail(function() {
      alert('資料取得失敗，可能要先登入');
    });
  });

  $('#delete_loan').unbind('click');
  $('#delete_loan').click(function() {
    var request = {};
    request.id = $(this).data('loan_id');
    $.post('/api/user/loan/delete/' + request.id, request, function(result) {
      console.log(result);
    });
  });

  $('#create_loan').unbind('click');
  $('#create_loan').click(function() {
    var request = {};
    var temp;
    var i;
    var errMsg = '';
    var LoanTimeTypeList = [
      'user',
      'number',
      'english'
    ];

    request.property_id = $('.modal').find('#classroom').val();

    switch(LoanType) {
      case 1: { // 短期
        temp = $('.modal').find('input[name="start_date"]').val();
        temp = moment(new Date(temp)).format('YYYY-MM-DD');
        if(temp != 'Invalid date') {
          var a = new Date();
          var b = new Date(temp);

          if(b >= a) {
            request.date_began_at = temp;
            request.date_ended_at = temp;
          }else {
            errMsg += '日期太早';
          }
        }else {
          errMsg += '還沒選擇日期';
        }

        break;
      }
      case 2: { // 長期
        temp = $('.modal').find('input[name="start_date"]').val();
        temp = moment(new Date(temp)).format('YYYY-MM-DD');
        if(temp != 'Invalid date') {
          request.date_began_at = temp;
        }else {
          errMsg += '還沒選擇開始日期';
        }
        temp = $('.modal').find('input[name="end_date"]').val();
        temp = moment(new Date(temp)).format('YYYY-MM-DD');
        if(temp != 'Invalid Date') {
          request.date_ended_at = temp;
        }else {
          errMsg += '還沒選擇結束日期';
        }

        // check date 先後
        if(errMsg == '') {

        }

        temp = [];
        for(i = 0; i < 7; i++) {
          if($('#day' + i).prop('checked')) {
            temp[i] = 1;
          }else {
            temp[i] = 0;
          }
        }
        request.long_term_token = temp[6].toString();
        for(i = 5; i >= 0; i--) {
          request.long_term_token += temp[i].toString();
        }

        break;
      }
    }

    request.time_began_at =  $('.modal').find('.' + LoanTimeTypeList[LoanTimeType - 1] + '_period')
      .find('select[name="' + LoanTimeTypeList[LoanTimeType - 1] + '_start"]')
      .val();

    request.time_ended_at = $('.modal').find('.' + LoanTimeTypeList[LoanTimeType - 1] + '_period')
      .find('select[name="' + LoanTimeTypeList[LoanTimeType - 1] + '_end"]')
      .val();

    // check start and end date diff
    if(errMsg == '') {
      var startTime = $('.modal').find('.' + LoanTimeTypeList[LoanTimeType - 1] + '_period')
        .find('select[name="' + LoanTimeTypeList[LoanTimeType - 1] + '_start"]')
        .val();
      var endTime = $('.modal').find('.' + LoanTimeTypeList[LoanTimeType - 1] + '_period')
        .find('select[name="' + LoanTimeTypeList[LoanTimeType - 1] + '_end"]')
        .val();
      if(endTime < startTime) {
        errMsg += '時段前後順序不對，可能太早';
      }
    }

    request.remark = $('input[name="remark"]').val();

    console.log(errMsg);
    console.log(request);
    return;
    $.post('/api/user/loan/create', request, function(result) {
      console.log(result);
    });
  });

  $('#edit_loan').unbind('click');
  $('#edit_loan').click(function() {

  });
}

function getLoanHistory() {
  var request = {};
  request.page = NowPage;
  request.length = 10;
  $.get('/api/user/loan/classrooms', request, function(result) {
    console.log(result);
    LoanHistory = result.data;

    if(NowPage == 1) {
      AllPage = result.total;
    }

    produceLoanHistory();
  });
}

function produceLoanHistory() {
  var i;
  var j;
  var text;

  $('#history_card_container').html('');
  for(i = 0; i < 10 && i < LoanHistory.length; i++) {
    text =  '<div class="row card-content">';
    text += '<span class="col s4">' + LoanHistory[i].property_name + '</span>';
    text += '<span class="col s4">';
    text += _.trim(LoanHistory[i].time_began_at) + ' ~ ' + _.trim(LoanHistory[i].time_ended_at);
    text += '</span>';
    text += '<span class="col s4 history_btn" data-loan_id="' + i + '">';
    text += '<a class="waves-effect waves-light btn modal-trigger" data-modal_target="loan_class">';
    text += '<i class="material-icons">build</i>更改/刪除</i>';
    text += '</a></span>';
    text += '</div>';
    $('#history_card_container').append(text);
  }

  loanButtonEvent();
  produceHistoryPage();
}

function produceHistoryPage() {
  var i;
  var text;
  for(i = 0; i < AllPage; i++) {

  }
}

function LoanPageEvent() {

}

function InsertDataToModal(id) {
  var temp;
  var group;
  var start;
  var end;
  var i;
  console.log(LoanHistory[id]);
  if(LoanHistory[id].long_term_token != null) {
    $('.modal #long').click();
    $('input[name="start_date"]').val(LoanHistory[id].date_began_at);
    $('input[name="end_date"]').val(LoanHistory[id].date_ended_at);

    $('.modal input[type="checkbox"]').prop('checked', false);
    temp = LoanHistory[id].long_term_token.split('').reverse();
    for(i = 0; i < 7; i++) {
      if(temp[i] == 1) {
        $('.modal').find('#day' + i).prop('checked', true);
      }
    }
  }else {
    $('.modal #short').click();
    $('input[name="start_date"]').val(LoanHistory[id].date_began_at);
  }

  $('#classroom option[value="' + LoanHistory[id].property_id + '"]').prop('selected', true);

  temp = LoanHistory[id].time_began_at.split(':');
  group = groupTool(temp[1]);
  start = LoanHistory[id].time_began_at;
  end = LoanHistory[id].time_ended_at;

  switch(group){
    case 3: {
      $('.switch_time_container')
        .find('#user_btn')
        .click();
      console.log(start + end);
      $('.modal select[name="user_start"]')
        .find('[value="' + start + '"]')
        .prop('selected', true);
      $('.modal select[name="user_end"]')
        .find('[value="' + end + '"]')
        .prop('selected', true);
      break;
    }
    case 1: {
      $('.switch_time_container')
        .find('#number_btn')
        .click();
      break;
    }
    case 2: {
      $('.switch_time_container')
        .find('#english_btn')
        .click();
      break;
    }
  }
  // update select status
  $('.modal select').material_select();

  $('.modal').find('input[name="remark"]')
    .val(LoanHistory[id].remark);

  $('#edit_loan').attr('data-loan_id', id);
  $('#delete_loan').attr('data-loan_id', id);
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
