import Sammy from 'sammy';
var PeriodStart = [
  '08:00:00', '08:30:00',
  '09:00:00', '09:30:00', '10:00:00', '10:30:00', '11:00:00', '11:30:00',
  '12:00:00', '12:30:00', '13:00:00', '13:30:00', '14:00:00', '14:30:00',
  '15:00:00', '15:30:00', '16:00:00', '16:30:00', '17:00:00', '17:30:00',
  '18:00:00', '18:30:00', '19:00:00', '19:30:00', '20:00:00', '20:30:00',
  '21:00:00', '21:30:00', '22:00:00', '22:30:00', '23:00:00', '23:30:00'
];
var PeriodEnd = [
  '08:30:00', '09:00:00',
  '09:30:00', '10:00:00', '10:30:00', '11:00:00', '11:30:00', '12:00:00',
  '12:30:00', '13:00:00', '13:30:00', '14:00:00', '14:30:00', '15:00:00',
  '15:30:00', '16:00:00', '16:30:00', '17:00:00', '17:30:00', '18:00:00',
  '18:30:00', '19:00:00', '19:30:00', '20:00:00', '20:30:00', '21:00:00',
  '21:30:00', '22:00:00', '22:30:00', '23:00:00', '23:30:00', '24:00:00'
];
var LoanTable; // Table Data
var LoanTablePage;
var AllLoanTablePage;

var LoanHistory; // History Data
var CurrentHistoryPage;
var FinalHistoryPage;

var LoanType; // one_day, many_days

Sammy('#main', function() {
  this.get('#/user/loan', function(context) {
    context.time = {};
    context.time.PeriodStart = PeriodStart;
    context.time.PeriodEnd = PeriodEnd;
    context.TableTimes = _.times(5);
    context.PeriodTimes = _.times(32);

    context.loadPartials({menu: '/templates/user/menu.ms'})
      .partial('/templates/user/loan.ms')
      .then(function() {
        // bind Event
        loanButtonEvent();
        loanDataEvent();
        userLoanInitEvent();
        loanTablePageEvent();

        // new inline display calendar
        var picker = new Pikaday({
          field: document.getElementById('datepicker'),
          bound: false,
          container: document.getElementById('datepicker_container'),
          format: 'YYYY-MM-DD'
        });

        var today = moment(new Date()).format('YYYY-MM-DD');
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

  $('ul.tabs').tabs();
}

function initModal() {
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

      LoanTablePage = 0;
      produceLoanTable();
    }else {
      $('#loan_container').hide();
      $('#history_container').show();

      CurrentHistoryPage = 1;
      getLoanHistory();
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
      AllLoanTablePage = Math.floor(result.length / 5);
      LoanTable = [];
      LoanTable = result;

      produceLoanTable();
      console.log(LoanTable);
    }).fail(function() {
      Materialize.toast('資料取得失敗，可能要先登入', 1000);
    });
  });

  $('#delete_loan').unbind('click');
  $('#delete_loan').click(function() {
    var request = {};
    request.id = $(this).data('loan_id');

    $.post('/api/user/loan/delete/' + request.id, request, function(result) {
      console.log(result);
    }).fail(function() {
      Materialize.toast('刪除失敗', 1000);
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

    request._token = $('meta[name="csrf-token"]').attr('content');
    // classroom id
    request.property_id = $('.modal').find('#classroom').val();

    // begin date and end date
    if(LoanType == 'one_day') {// one_day
      temp = $('.modal').find('input[name="start_date"]').val();
      temp = moment(new Date(temp)).format('YYYY-MM-DD');
      if(temp != 'Invalid date') {
        a = new Date();
        b = new Date(temp);

        if(b >= a) {
          request.date_began_at = temp;
          request.date_ended_at = temp;
        }else {
          Materialize.toast('日期太早', 1000);
          return;
        }
      }else {
        Materialize.toast('還沒選擇日期', 1000);
        return;
      }
    }else { // many_days
      temp = $('.modal').find('input[name="start_date"]').val();
      temp = moment(new Date(temp)).format('YYYY-MM-DD');
      if(temp != 'Invalid date') {
        request.date_began_at = temp;
      }else {
        Materialize.toast('還沒選擇開始日期', 1000);
        return;
      }
      temp = $('.modal').find('input[name="end_date"]').val();
      temp = moment(new Date(temp)).format('YYYY-MM-DD');
      if(temp != 'Invalid Date') {
        request.date_ended_at = temp;
      }else {
        Materialize.toast('還沒選擇結束日期', 1000);
        return;
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
        Materialize.toast('時段前後順序不對，可能太早', 1000);
      }
    }

    request.remark = $('input[name="remark"]').val();

    console.log(request);
    $.post('/api/user/loan/create', request, function(result) {
      if(result.status == 0) {
        Materialize.toast('請求借用成功', 1000);
      }else {
        Materialize.toast('請求借用失敗', 1000);
      }
      console.log(result);
    }).fail(function() {
      Materialize.toast('新增借用失敗', 1000);
    });
  });
}

function getLoanHistory() {
  var request = {};
  request.page = CurrentHistoryPage;
  request.length = 10;
  $.get('/api/user/loan/classrooms', request, function(result) {
    console.log(result);
    LoanHistory = result.data;

    if(CurrentHistoryPage == 1) {
      FinalHistoryPage = Math.ceil(result.total / 10);
    }

    if(result.total == 0) {
      Materialize.toast('Not History', 1000);
    }else {
      produceLoanHistory();
    }
  });
}

function produceLoanHistory() {
  var i;
  var text;

  $('#history_card_container').html('');
  for(i = 0; i < 10 && i < LoanHistory.length; i++) {
    text =  '<li>';
    // header
    text += '<div class="collapsible-header">';
    text += '<span class="col s4">' + LoanHistory[i].property_name + '</span>';
    text += '<span class="col s4">';
    if(LoanHistory[i].time_began_at == null) {
      text += '整天';
    }else {
      text += LoanHistory[i].time_began_at + ' ~ ' + LoanHistory[i].time_ended_at;
    }
    text += '</span>';
    text += '</div>';
    // body
    text += '<div class="collapsible-body">';
    text += '</div>';
    text += '</li>';
    $('#history_card_container').append(text);
  }

  $('.collapsible').collapsible({
    accordion: false
  });
  loanButtonEvent();
  produceHistoryPage();
}

function produceHistoryPage() {
  var i;
  var minPage = Math.max(CurrentHistoryPage - 5, 1);
  var maxPage = Math.min(minPage + 10, FinalHistoryPage);
  var text;

  // empty
  $('#history_page_container').html('');
  text = '<li id="history_prev" class="waves-effect"><a><i class="material-icons">chevron_left</i></a></li>';
  for(i = minPage; i <= maxPage; i++) {
    if(i != CurrentHistoryPage) {
      text += '<li class="waves-effect history_page" data-history_page="' + i + '">';
      text += '<a>' + i + '</a>';
      text += '</li>';
    }else {
      text += '<li class="active">';
      text += '<a>' + i + '</a>';
      text += '</li>';
    }
  }
  text += '<li id="history_next" class="waves-effect"><a><i class="material-icons">chevron_right</i></a></li>';
  $('#history_page_container').append(text);

  // Disable change page btn
  if(CurrentHistoryPage == 1) {
    $('#history_prev').removeClass('waves-effect').addClass('disabled');
  }else if(CurrentHistoryPage == FinalHistoryPage) {
    $('#history_next').removeClass('waves-effect').addClass('disabled');
  }

  // bind Page Event
  loanHistoryPageEvent();
}

function loanHistoryPageEvent() {
  $('#history_prev').unbind('click');
  $('#history_prev').click(function() {
    if(CurrentHistoryPage == 1) {
      Materialize.toast('已在最前頁', 1000);
      return;
    } else {
      CurrentHistoryPage--;
      getLoanHistory();
    }
  });

  $('#history_next').unbind('click');
  $('#history_next').click(function() {
    if(CurrentHistoryPage == FinalHistoryPage) {
      Materialize.toast('已在最末頁', 1000);
      return;
    } else {
      CurrentHistoryPage++;
      getLoanHistory();
    }
  });

  $('.history_page').unbind('click');
  $('.history_page').click(function() {
    CurrentHistoryPage = $(this).data('history_page');
    getLoanHistory();
  });
}

function loanTablePageEvent() {
  $('#classroom_prev').unbind('click');
  $('#classroom_prev').click(function() {
    if(LoanTablePage == 0) {
      Materialize.toast('已在最前頁', 1000);
    }else {
      LoanTablePage--;
      produceLoanTable();
    }
  });

  $('#classroom_next').unbind('click');
  $('#classroom_next').click(function() {
    if(LoanTablePage == AllLoanTablePage) {
      Materialize.toast('已在最末頁', 1000);
    }else {
      LoanTablePage++;
      produceLoanTable();
    }
  });
}

function produceLoanTable() {
  // empty td
  $('table').find('.tr_classroom')
    .find('.td_time_period, .td_classroom_name')
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

  //console.log(id + ', ' + index);
  for(let i = 0; i < LoanTable[id].loan_classroom.length; i++) {
    // examine selected day's status
    began = new Date(LoanTable[id].loan_classroom[i].date_began_at); // date began
    ended = new Date(LoanTable[id].loan_classroom[i].date_ended_at); // date ended
    if(began <= selectedDay && selectedDay <= ended) {// check the day
      if(LoanTable[id].loan_classroom[i].time_began_at != null) {
        began = LoanTable[id].loan_classroom[i].time_began_at;
        ended = LoanTable[id].loan_classroom[i].time_ended_at;
        //console.log(began + '~' + ended);
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
        //console.log(id + ', ' + index + 'all day');
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
