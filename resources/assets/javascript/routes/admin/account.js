var Sammy = require('sammy');
var CurrentPage = 1;
var FinalPage;
var Filter;
var SelectAll = 'unselect';

Sammy('#main', function() {
  this.get('#/admin/account', function(context) {
    context.loadPartials({menu: '/templates/admin/menu.ms'})
      .partial('/templates/admin/account.ms')
      .then(function() {
        accountButtonEvent();
        accountDataEvent();
        getUserList();
        $('#view_role').material_select();
      });
  });
});

function accountButtonEvent() {
  var modalTarget;
  $('#account_container').find('.modal-trigger')
    .on('click', function(event) {
      var type;
      var id;

      $('#materialize-lean-overlay-30').css('display', 'block');
      modalTarget = $(this).data('modal_target');
      $('#' + modalTarget).fadeIn();

      if(modalTarget == 'user') {
        type = $(this).data('type');
        if(type == 'add') {// add
          $('#addAccountBtn').show();
          $('#updateAccountBtn').hide();
        }else {// update
          id = $(this).data('id');
          $('#addAccountBtn').hide();
          $('#updateAccountBtn')
            .show()
            .attr('data-id', id);
        }
      }
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

        $('input[name="studentData"]').val(null);// empty input file
        Materialize.toast('上傳檔案成功');
        $('#materialize-lean-overlay-30').css('display', 'none');
        $('#import').fadeOut();
        CurrentPage = 1;
        getUserList();
      },
      error: function() {
        Materialize.toast('上傳檔案失敗');
      }
    });
  });

  $('#selectAllBtn').unbind('click');
  $('#selectAllBtn').click(function() {
    if(SelectAll == 'unselect') {
      SelectAll = 'select';
      $('input[name="delete"]').prop('checked', true);
    }else if(SelectAll == 'select') {
      SelectAll = 'unselect';
      $('input[name="delete"]').prop('checked', false);
    }
  });
}

function accountDataEvent() {
  // create Account
  $('#addAccountBtn').unbind('click');
  $('#addAccountBtn').click(function() {
    var request = {};
    request._token = $('meta[name="csrf-token"]').attr('content');

    request.username = $('#account').val();
    request.password = $('#password').val();
    request.nickname = $('#nickname').val();
    request.email = $('#email').val();
    request.phone = $('#phone').val();
    request.group = $('#group').val();
    request.role = $('#type').val();

    console.log(request);
    $.post('/api/manager/user', request, function(result) {
      console.log(result);
      Materialize.toast('新增失敗');
    }).fail(function() {
      Materialize.toast('新增失敗');
    });
  });

  $('#updateAccountBtn').unbind('click');
  $('#updateAccountBtn').click(function() {
    var id = $(this).data('id');
    var request = {};
    request._token = $('meta[name="csrf-token"]').attr('content');

    return;
    $.ajax({
      url: '/api/manager/user/update/' + id,
      method: 'put',
      data: request,
      success: function(result) {

      },
      fail: function() {

      }
    });
  });

  $('#deleteAccountBtn').unbind('click');
  $('#deleteAccountBtn').click(function() {
    var i = 0;
    var count = $('input[name="delete"]:checked').length;
    var request = {};
    request._token = $('meta[name="csrf-token"]').attr('content');

    if(count == 0) {
      Materialize.toast('尚未選擇要刪除的目標');
      return;
    }

    request.usernames = [];
    $('input[name="delete"]:checked').each(function() {
      request.usernames[i] = $(this).data('username');
      i++;
    });

    console.log(request);
    return;
    $.ajax({
      url: '/api/manager/user/update/' + id,
      method: 'delete',
      data: request,
      success: function(result) {

      },
      fail: function() {

      }
    });
  });

  $('#view_role').unbind('change');
  $('#view_role').change(function() {
    CurrentPage = 1;
    getUserList();
  });
}

function getUserList() {
  var request = {};
  request._token = $('meta[name="csrf-token"]').attr('content');
  request.page = CurrentPage;
  request.role = $('#view_role').val();

  $.get('/api/manager/user', request, function(result) {
    console.log(result);
    FinalPage = Math.ceil(result.total / 10);
    SelectAll = 'unselect';
    produceAccountList(result.data);
    producePage();
    accountButtonEvent();// bind modal Btn
  }).fail(function() {
    Materialize.toast('帳號資料取得失敗');
  });
}

function produceAccountList(list) {
  var text = '';
  var i;
  var id;
  var username;
  var nickname;
  var phone;
  var email;

  $('#list_element_container').html('');// empty old html label
  for(i = 0; i < list.length; i++) {
    id = list[i].id;
    username = list[i].username ;
    nickname = list[i].nickname;
    phone = list[i].phone;
    email = list[i].email;

    text =  '<li style="border:1px solid">';
    text += '<div class="row">';

    // button
    text += '<div class="col s2">';
    text += `<input type="checkbox" name="delete" id="delete${i}" data-username="${username}">`;
    text += `<label for="delete${i}"></label>`;
    text += `<button class="btn green modal-trigger" data-modal_target="user" data-id="${id}">更新</button>`;
    text += '</div>';

    // user data
    text += '<div class="col s9">';

    text += '<div class="row">';
    text += `<span class="col s3"><b>帳號:</b>${username}</span>`;
    text += `<span class="col s3"><b>電話:</b>${phone}</span>`;
    text += '</div>';

    text += '<div class="row">';
    text += `<span class="col s3"><b>使用者:</b>${nickname}</span>`;
    text += `<span class="col s5"><b>電子郵件:</b>${email}</span>`;
    text += '</div>';

    text += '</div>';
    text += '</li>';
    $('#list_element_container').append(text);
  }
}

function producePage() {
  var i;
  var minPage = Math.max(CurrentPage - 5, 1);
  var maxPage = Math.min(minPage + 10, FinalPage);
  var text;

  // empty
  $('#list_page_container').html('');
  text = '<li id="list_prev" class="waves-effect"><a><i class="material-icons">chevron_left</i></a></li>';
  for(i = minPage; i <= maxPage; i++) {
    if(i != CurrentPage) {
      text += '<li class="waves-effect list_page" data-list_page="' + i + '">';
      text += '<a>' + i + '</a>';
      text += '</li>';
    }else {
      text += '<li class="active">';
      text += '<a>' + i + '</a>';
      text += '</li>';
    }
  }
  text += '<li id="list_next" class="waves-effect"><a><i class="material-icons">chevron_right</i></a></li>';
  $('#list_page_container').append(text);

  // Disable change page btn
  if(CurrentPage == 1) {
    $('#list_prev').removeClass('waves-effect').addClass('disabled');
  }else if(CurrentPage == FinalPage) {
    $('#list_next').removeClass('waves-effect').addClass('disabled');
  }

  // bind Event
  listEvent();
}

function listEvent() {
  $('#list_prev').unbind('click');
  $('#list_prev').click(function() {
    if(CurrentPage == 1) {
      Materialize.toast('已在最前頁', 1000);
      return;
    } else {
      CurrentPage--;
      getUserList();
    }
  });

  $('#list_next').unbind('click');
  $('#list_next').click(function() {
    if(CurrentPage == FinalPage) {
      Materialize.toast('已在最末頁', 1000);
      return;
    } else {
      CurrentPage++;
      getUserList();
    }
  });

  $('.list_page').unbind('click');
  $('.list_page').click(function() {
    CurrentPage = $(this).data('list_page');
    getUserList();
  });
}

