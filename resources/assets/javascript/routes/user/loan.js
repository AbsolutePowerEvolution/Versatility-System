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

var ClassroomName = [];
var LoanHistory; // History Data

var LoanType; // one_day, many_days. For Modal

Sammy('#main', function() {
  this.get('#/user/loan', function(context) {
    context.time = {};
    context.time.PeriodStart = PeriodStart;
    context.time.PeriodEnd = PeriodEnd;
    context.TableTimes = _.times(5);
    context.PeriodTimes = _.times(32);
    // context.thirty_times = _.times(30, _.uniqueId.bind(null, 'ball'));

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
  request._token = $('meta[name="csrf-token"]').attr('content');
  request.date = moment(new Date()).format('YYYY-MM-DD');

  // get all classroom name
  $.get('/api/user/property/classrooms', request, function(result) {
    console.log(result);

    for(let i = 0, text = ''; i < result.length; i++) {
      text =  '<option value=' + result[i].id + '>';
      text += result[i].name;
      text += '</option>';

      ClassroomName[result[i].id] = result[i].name;
      $('.modal')
        .find('#classroom')
        .find('option:last')
        .after(text);
    }

    loanMaterializeEvent();
  });

  request.con_str = '>=';
  // get all period that can be borrowed
  $.get('/api/manager/setting', request, function(result) {
    console.log('setting');
    console.log(result);

    // append setting time data to Modal Select
    for(let i = 0, text = ''; i < result.length; i++) {
      text =  `<option value="${i}"`;
      text += ` data-began="${result[i].date_began_at}" data-ended="${result[i].date_ended_at}">`;
      text += `${result[i].zone_name}`;
      text += `( ${result[i].date_began_at} ~ ${result[i].date_ended_at} )`;
      text += '</option>';

      $('.modal')
        .find('#setting_time')
        .find('option:last')
        .after(text);
    }
    loanMaterializeEvent();

    // append setting time data to User View
    for(let i = 0, text = ''; i < result.length; i++) {
      text =  `<div class="col s12">`;
      text += `<b>${i + 1}</b>. ${result[i].zone_name}`;
      text += `( ${result[i].date_began_at} ~ ${result[i].date_ended_at} )`;
      text += '</div>';

      $('#view_setting_time')
        .append(text);
    }
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
    var today = moment(new Date()).format('YYYY-MM-DD');

    if(screenType == 'loan') {
      $('#loan_container').show();
      $('#history_container').hide();

      LoanTablePage = 0;
      produceLoanTable();
    }else {
      $('#loan_container').hide();
      $('#history_container').show();

      $('#history_date').val(today);
      getLoanHistory();
    }
  });

  $('.modal .swtich_date').unbind('click');
  $('.modal .switch_date').click(function() {
    var dateType = $(this).data('date_type');
    if(dateType == 'many_days') {
      LoanType = 'many_days';
    }else {
      LoanType = 'one_day';
    }

    $('.modal .for_all').hide();
    $('.modal .for_' + dateType).show();

    // button color
    $(this).parent()
      .find('button')
      .removeClass('pink darken-4');
    $(this).addClass('pink darken-4');
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
    var date = $(this).val();

    request._token = $('meta[name="csrf-token"]').attr('content');
    request.status = 'accepted';

    $.get('/api/user/loan/classrooms/' + date, request, function(result) {
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
    request.type = 'course';

    // get begin date and end date
    if(LoanType == 'one_day') {// one_day
      temp = $('.modal').find('input[name="start_date"]').val();
      temp = moment(new Date(temp)).format('YYYY-MM-DD');
      if(temp != 'Invalid date') {
        a = new Date(); // now time
        b = new Date(temp); // select date

        if(b.getDate() >= a.getDate()) {
          request.date_began_at = temp;
          request.date_ended_at = temp;
        } else {
          Materialize.toast('不能借過去的日期', 1000);
          return;
        }
      } else {
        Materialize.toast('還沒選擇日期', 1000);
        return;
      }
    } else { // many_days
      temp = $('#setting_time').val();
      request.date_began_at = $('#setting_time')
        .find('option[value="' + temp + '"]')
        .data('began');
      request.date_ended_at = $('#setting_time')
        .find('option[value="' + temp + '"]')
        .data('ended');

      // long term token
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

    request.time_began_at = $('.modal')
      .find('select[name="time_start"]')
      .val();
    request.time_ended_at = $('.modal')
      .find('select[name="time_end"]')
      .val();
    // check start and end date diff
    if(errMsg == '') {
      a = matchTool(request.time_began_at, PeriodStart);
      b = matchTool(request.time_ended_at, PeriodEnd);
      if(a > b) {
        Materialize.toast('時段前後順序不對，可能太早', 1000);
        return;
      }
    }

    request.remark = $('input[name="remark"]').val();
    console.log(request);
    $.post('/api/user/loan/class-create', request, function(result) {
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
  var temp = $('#history_date').val();
  var request = {};
  request.status = 'accepted';
  request.date = moment(new Date(temp)).format('YYYY-MM-DD');

  console.log(request);
  $.get('/api/user/loan/classrooms/' + request.date, request, function(result) {
    console.log(result);
    LoanHistory = result;
    produceLoanHistory();
  }).fail(function() {
    Materialize.toast('借用紀錄資料取得失敗');
  });
}

function produceLoanHistory() {
  var i;
  var j;
  var list;
  var text;
  // header
  var propertyName;
  var dateBeganAt;
  var dateEndedAt;
  var timeBeganAt;
  var timeEndedAt;
  // body
  var nickname;
  var email;
  var remark;
  var id;
  // check not zero
  var total = 0;

  $('#history_card_container').html('');// empty old html label
  for(j = 0; j < LoanHistory.length; j++) {
    list = LoanHistory[j].loans;

    for(i = 0; i < list.length; i++) {
      total++;
      propertyName = ClassroomName[list[i].property_id];
      dateBeganAt = list[i].date_began_at;
      dateEndedAt = list[i].date_ended_at;
      timeBeganAt = list[i].time_began_at;
      timeEndedAt = list[i].time_ended_at;

      text =  '<li>';
      // header
      text += '<div class="collapsible-header"><div class="row">';
      text += `<span class="col s2"><b>教室:</b>${propertyName}</span>`;
      if(list[i].long_term_token !== null) {
        text += '<span class="col s2"><b>類型:</b>短期</span>';
        text += `<span class="col s3"><b>日期:</b>${dateBeganAt}</span>`;
      } else {
        text += '<span class="col s2"><b>類型:</b>長期</span>';
        text += `<span class="col s3"><b>日期:</b>${dateBeganAt}~${dateEndedAt}</span>`;
      }
      text += '<span class="col s3"><b>時段:</b>';
      if(list[i].time_began_at == null) {
        text += '整天';
      }else {
        text += `${timeBeganAt}~${timeEndedAt}`;
      }
      text += '</span></div></div>';

      nickname = list[i].nickname;
      email = list[i].email;
      remark = list[i].remark;
      id = list[i].id;
      // body
      text += '<div class="collapsible-body"><div class="row">';
      text += `<span class="col offset-s1 s2">借用人</span><span class="col s8">${nickname}</span>`;
      text += '</div><div class="row">';
      text += `<span class="col offset-s1 s2">聯絡方式</span><span class="col s8">${email}</span>`;
      text += '</div><div class="row">';
      text += `<span class="col offset-s1 s2">借用理由:</span><span class="col s8">${remark}</span>`;
      text += '</div><div class="row center-align">';
      text += `<button class="btn red history_delete_btn" data-history_id="${id}">刪除</button>`;
      text += '</div></li>';
      $('#history_card_container').append(text);
    }
  }

  if(total == 0) {
    Materialize.toast('這天沒有借用紀錄', 1000);
  }

  $('.collapsible').collapsible({
    accordion: false
  });
  loanButtonEvent();
  loanHistoryEvent();
}

function loanHistoryEvent() {
  $('.history_delete_btn').unbind('click');
  $('.history_delete_btn').click(function() {
    var historyId = $(this).data('history_id');
    var request = {};
    request._token = $('meta[name="csrf-token"]').attr('content');

    $.ajax({
      url: '/api/user/loan/delete/' + historyId,
      method: 'delete',
      data: request,
      success: function(result) {
        console.log(result);
        Materialize.toast('刪除歷史紀錄成功', 1000);
        getLoanHistory();
      },
      fail: function() {
        Materialize.toast('刪除歷史紀錄失敗', 1000);
      }
    });
  });

  $('#history_date').unbind('change');
  $('#history_date').change(function() {
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

  for(let i = 0; i < LoanTable[id].loans.length; i++) {
    // examine selected day's status
    began = new Date(LoanTable[id].loans[i].date_began_at); // date began
    ended = new Date(LoanTable[id].loans[i].date_ended_at); // date ended
    if(began <= selectedDay && selectedDay <= ended) {// check the day
      if(LoanTable[id].loans[i].time_began_at != null) {
        began = LoanTable[id].loans[i].time_began_at;
        ended = LoanTable[id].loans[i].time_ended_at;
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

