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

        $('#excel').change(function() {
          console.log(this.files[0]);
        });
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
