var Sammy = require('sammy');
var PeriodStart = [
  '07:00:00', '07:30:00', '08:00:00', '08:30:00', '09:00:00', '09:30:00',
  '10:00:00', '10:30:00', '11:00:00', '11:30:00', '12:00:00', '12:30:00',
  '13:00:00', '13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00',
  '16:00:00', '16:30:00', '17:00:00', '17:30:00', '18:00:00', '18:30:00',
  '19:00:00', '19:30:00', '20:00:00', '20:30:00', '21:00:00', '21:30:00'
];
var PeriodEnd = [
  '07:30:00', '08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00',
  '10:30:00', '11:00:00', '11:30:00', '12:00:00', '12:30:00', '13:00:00',
  '13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00',
  '16:30:00', '17:00:00', '17:30:00', '18:00:00', '18:30:00', '19:00:00',
  '19:30:00', '20:00:00', '20:30:00', '21:00:00', '21:30:00', '22:00:00'
];
var LoanTable; // Table Data
var LoanTablePage;
var AllLoanTablePage;

var LoanHistory; // History Data
var HistoryPage;
var AllHistoryPage;

var LoanType; // one_day, few_days, many_days
var LoanTimeType; // 30 minutes, all day

Sammy('#main', function() {
  this.get('#/user/loan', function(context) {
    context.time = {};
    context.time.PeriodStart = PeriodStart;
    context.time.PeriodEnd = PeriodEnd;
    context.FiveTimes = _.times(5);
    context.ThirtyTimes = _.times(30);
    // context.thirty_times = _.times(30, _.uniqueId.bind(null, 'ball'));

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

        var today = new moment(new Date()).format('YYYY-MM-DD');
        $('#datepicker').val(today).change();
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
    var text;

    for(let i = 0; i < result.length; i++) {
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
  $('.modal').find('.switch_date:first').click();
  $('.modal').find('.switch_time:first').click();
  $('.modal').find('#input[name="start_date"]').val('');
  $('.modal').find('#input[name="end_date"]').val('');
  $('.modal').find('input[type="checkbox"]').prop('checked', false);
  $('.modal').find('select')
    .find('option:nth-of-type(2)')
    .prop('selected', true);
  $('.modal').find('select').material_select(); // refresh select
}

function loanButtonEvent() {
  var modalTarget;
  var switchTimeTarget;
  $('#main').find('.modal-trigger')
    .on('click', function(event) {
      initModal();

      $('#materialize-lean-overlay-30').css('display', 'block');
      modalTarget = $(this).data('modal_target');
      $('#' + modalTarget).fadeIn();
    });

  $('#main').find('.modal-close, #materialize-lean-overlay-30')
    .on('click', function(event) {
      $('#materialize-lean-overlay-30').css('display', 'none');
      $('#' + modalTarget).fadeOut();
    });

  $('.switch_screen').unbind('click');
  $('.switch_screen').click(function() {
    var screenType = $(this).data('screen_type');
    if(screenType == 'loan') {
      $('#loan_container').show();
      $('#history_container').hide();
    }else {
      $('#loan_container').hide();
      $('#history_container').show();

      HistoryPage = 1;
      getLoanHistory();
    }
  });

  $('.modal .swtich_date').unbind('click');
  $('.modal .switch_date').click(function() {
    var dateType = $(this).data('date_type');
    if(dateType == 'many_days') {
      LoanType = 3;
    }else if(dateType == 'few_days') {
      LoanType = 2;
    }else {
      LoanType = 1;
    }

    $('.modal .days').hide();
    $('.modal .for_' + dateType).show();

    // button color
    $(this).parent()
      .find('button')
      .removeClass('pink darken-4');
    $(this).addClass('pink darken-4');
  });

  $('.modal .switch_time').unbind('click');
  $('.modal .switch_time').click(function() {
    $(this).parent()
      .find('button')
      .removeClass('pink darken-4');
    $(this).addClass('pink darken-4');

    switchTimeTarget = $(this).data('time_period');
    if(switchTimeTarget == 'thirty_minutes') {
      $('.modal .time_container').show();
      LoanTimeType = 1;
    }else {
      $('.modal .time_container').hide();
      LoanTimeType = 2;
    }
  });

  $('.history_btn').unbind('click');
  $('.history_btn').click(function() {
    var id = $(this).data('loan_id');
    $('#delete_loan').attr('data-loan_id', id);
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
      AllLoanTablePage = result.length;
      LoanTable = [];
      LoanTable = result;

      produceLoanTable();
      console.log(LoanTable);
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
    }).fail(function() {
      alert('刪除失敗');
    });
  });

  $('#create_loan').unbind('click');
  $('#create_loan').click(function() {
    var request = {};
    var i;
    var a; // for temp
    var b; // for temp
    var temp;
    var errMsg = '';

    request.property_id = $('.modal').find('#classroom').val();

    switch(LoanType) {
      case 1: { // one_day
        temp = $('.modal').find('input[name="start_date"]').val();
        temp = moment(new Date(temp)).format('YYYY-MM-DD');
        if(temp != 'Invalid date') {
          a = new Date();
          b = new Date(temp);

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
      case 2: { // few_days
        request.time_began_at =  $('.modal')
          .find('select[name="time_start"]')
          .val();
        request.time_ended_at = $('.modal')
          .find('select[name="time_end"]')
          .val();

        break;
      }
      case 3: { // many_days
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

    // check start and end date diff
    if(errMsg == '') {
      var startTime = $('.modal')
        .find('select[name="time_start"]')
        .val();
      var endTime = $('.modal')
        .find('select[name="time_end"]')
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
}

function getLoanHistory() {
  var request = {};
  request.page = HistoryPage;
  request.length = 10;
  $.get('/api/user/loan/classrooms', request, function(result) {
    console.log(result);
    LoanHistory = result.data;

    if(HistoryPage == 1) {
      AllHistoryPage = result.total;
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
    if(LoanHistory[i].time_began_at == null) {
      text += '整天';
    }else {
      text += LoanHistory[i].time_began_at + ' ~ ' + LoanHistory[i].time_ended_at;
    }
    text += '</span>';
    text += '<span class="col s4 history_btn" data-loan_id="' + i + '">';
    text += '<a class="waves-effect waves-light btn modal-trigger" data-modal_target="loan_detail">';
    text += '<i class="material-icons">build</i>查看/刪除</i>';
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
  for(i = 0; i < AllHistoryPage; i++) {

  }
}

function LoanPageEvent() {

}

function produceLoanTable() {
  // empty td
  $('table').find('.tr_classroom')
    .find('.td_time_period')
    .html('');

  for(let i = (LoanTablePage * 5), j = 0; (i < LoanTable.length) && (j < 5); i++, j++) {
    $('table').find('.tr_classroom')
        .eq(j)
        .find('.td_classroom_name')
        .html(LoanTable[i].name);
    colorLoanTable(i, j);
  }
}

function colorLoanTable(id, index) {
  var selectedDay = new Date($('#datepicker').val());
  var began;
  var ended;

  // init X
  $('table').find('.tr_classroom')
    .eq(index)
    .find('.td_time_period')
    .html('X');

  console.log(id + ', ' + index);
  for(let i = 0; i < LoanTable[id].loan_classroom.length; i++) {
    // examine selected day's status
    began = new Date(LoanTable[id].loan_classroom[i].date_began_at); // date began
    ended = new Date(LoanTable[id].loan_classroom[i].date_ended_at); // date ended
    if(began <= selectedDay && selectedDay <= ended) {
      if(LoanTable[id].loan_classroom[i].time_began_at != null) {
        began = LoanTable[id].loan_classroom[i].time_began_at;
        ended = LoanTable[id].loan_classroom[i].time_ended_at;
        console.log(began + '~' + ended);
        began = matchTool(began, PeriodStart); // add one, because nth-of-type start from 1
        ended = matchTool(ended, PeriodEnd);

        for(let j = began; j <= ended; j++) {
          $('table').find('.tr_classroom')
              .eq(index)
              .find('.td_time_period')
              .eq(j)
              .html('O');
        }
      }else { // all days
        console.log(id + ', ' + index + 'all day [i = ' + i);
        $('table').find('.tr_classroom')
            .eq(index)
            .find('.td_time_period')
            .html('O');
      }
    }
  }
}

function matchTool(time, table) {
  var result;

  for(let i = 0; i < table.length; i++) {
    if(time === table[i]) {
      result = i;
      break;
    }
  }

  return result;
}

function validateData(type) {

}
