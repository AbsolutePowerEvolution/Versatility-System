var Sammy = require('sammy');
var CurrentPage = 1;
var TotalPage;
var Filter;

Sammy('#main', function() {
  this.get('#/admin/account', function(context) {
    context.loadPartials({menu: '/templates/admin/menu.ms'})
      .partial('/templates/admin/account.ms')
      .then(function() {
        accountButtonEvent();
        accountDataEvent();

      });
  });
});

function accountMaterializeEvent() {

}

function accountButtonEvent() {
  var modalTarget;
  $('#account_container').find('.modal-trigger')
    .on('click', function(event) {
      $('#materialize-lean-overlay-30').css('display', 'block');
      modalTarget = $(this).data('modal_target');
      $('#' + modalTarget).fadeIn();
    }
    );

  $('#account_container').find('.modal-close, #materialize-lean-overlay-30')
    .on('click', function(event) {
      $('#materialize-lean-overlay-30').css('display', 'none');
      $('#' + modalTarget).fadeOut();
    }
    );

  $('#importFileBtn').unbind('click');
  $('#importFileBtn').click(function() {
    var request = {};
    request._token = $('meta[name="csrf-token"]').attr('content');

    var file = $('input[name="studentData"]')[0].files[0];
    if(file == null) {
      Materialize.toast('請先選擇檔案');
      return;
    }

    $('#fileForm').ajaxSubmit({
      url: '/api/manager/user/import',
      method: 'POST',
      data: request,
      clearForm: true,
      success: function(result) {
        console.log(result);

        $('input[name="studentData"]').val('');// empty input file
      },
      error: function() {
        Materialize.toast('上傳檔案失敗');
      }
    });
  });
}

function accountDataEvent() {
  // create Account
  $('#create_account').unbind('click');
  $('#create_account').click(function() {
    var request = {};
    request._token = $('meta[name="csrf-token"]').attr('content');

    request.username = $('#account').val();
    request.password = $('#password').val();
    request.nickname = $('#nickname').val();
    request.email = $('#email').val();
    request.phone = $('#phone').val();

    $.post('/api/manager/user', request, function(result) {
      console.log(result);
    });
  });

  // update Account
  $('.update_account').unbind('click');
  $('.update_account').click(function() {
    var request = {};
    var id = $(this).data('account_id');

    $.ajax({
      url: '/api/manager/user/' + id,
      method: 'put',
      data: request,
      success: function(result) {
        console.log(result);
      },
      fail: function(result) {

      }
    });
  });

  // delete Account
  $('.delete_account').unbind('click');
  $('.delete_account').click(function() {
    $.delete('/api/manager/user/' + id, function(result) {
      console.log(result);
    });
  });
}

function produceAccountList(people) {
  var text = '';
  var i;
  var j;

}

function producePage() {
  var text = '';
  var i;
  var j;

}

/*
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

  // bind History Event
  loanHistoryEvent();
}



function loanHistoryEvent() {
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

  $('.history_delete_btn').unbind('click');
  $('.history_delete_btn').click(function() {
    var historyId = $(this).data('history_id');
    var request = {};
    request._token = $('meta[name="csrf-token"]').attr('content');

    $.ajax({
      url: '/api/manager/loan/class-delete/' + historyId,
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

 */
