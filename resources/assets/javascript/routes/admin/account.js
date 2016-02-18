var Sammy = require('sammy');
var PageLength;
var PageNow = 1;
var TotalPeople = 0;

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

}

function producePage() {
  var text = '';
  var i;
  var j;

}
