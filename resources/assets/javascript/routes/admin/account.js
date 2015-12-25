var Sammy = require('sammy');
var PageLength;
var PageNow = 1;
var TotalPeople = 0;

Sammy('#main', function() {
  this.use('Mustache', 'ms');

  this.get('#/admin/account', function(context) {
    context.partial('/templates/admin/account.ms')
      .then(function() {
        accountButtonEvent();
        accountDataEvent();
        $('.account_page').click();
      });
  });
});

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
}

function accountDataEvent() {
  // get Account List
  $('.account_page').unbind('click');
  $('.account_page').click(function() {
    PageNow = $(this).html();
    console.log(PageNow);
    $.get('/api/manager/user', function(result) {
      if(PageNow == 1) {
        TotalPeople = result.total;
        PageLength = Math.ceil(TotalPeople / 10);
      }
      console.log(result);
      // Produce Html
      producePage();
      produceAccountList(result.data);

      // Bind Event on New Element
      accountDataEvent();
      accountButtonEvent();
    });
  });

  // get Account Detail
  $('.account_list').unbind('click');
  $('.account_list').click(function() {
    var id = $(this).data('user_id');
    $.get('/api/manager/user/' + id, function(result) {
      console.log(result);
    });
  });

  // create Account
  $('#create_account').unbind('click');
  $('#create_account').click(function() {
    var request = {};

    $.post('/api/manager/user', request, function(result) {
      console.log(result);
    });
  });

  // update Account
  $('.update_account').unbind('click');
  $('.update_account').click(function() {
    var request = {};
    var id = $(this).data('account_id');

    $.put('/api/manager/user' + id, function(result) {
      console.log(result);
    });
  });

  // delete Account
  $('.delete_account').unbind('click');
  $('.delete_account').click(function() {
    $.delete('/api/manager/user' + id, function(result) {
      console.log(result);
    });
  });
}

function produceAccountList(people) {
  var text = '';
  var i;
  var j;

  for(i = Math.floor(PageNow / 10) * 10, j = 0; i < TotalPeople && j < 10; i++, j++) {
    text += '<div class="card">';
    text += '<div class="row card-content">';
    text += '<span class="col s4 center-align">帳號</span>';
    text += '<span class="col s4 center-align">權限</span>';
    text += '<a class="waves-effect waves-light btn modal-trigger account_list"';
    text += 'data-modal_target="card_detail" data-user_id="' + people[j].id + '">';
    text += '<i class="material-icons left">build</i>修改 / 刪除';
    text += '</a>';
    text += '</span>';
    text += '</div>';
    text += '</div>';
  }

  $('#first_row').after(text);
}

function producePage() {
  var text = '';
  var i;
  var j;

  for(i = Math.floor(PageNow / 10) * 10, j = 0; i < PageLength && j < 10; i++, j++) {
    if(i != PageNow - 1) {
      text += '<li class="waves-effect">';
    } else {
      text += '<li class="active">';
    }
    text += i + 1;
    text += '</li>';
  }
  $('#account_container').find('.page_prev')
    .after(text);
}
