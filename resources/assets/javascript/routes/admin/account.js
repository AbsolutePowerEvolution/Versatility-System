var Sammy = require('sammy');
var PageLength = 10;
var PageNow = 1;

Sammy('#main', function() {
  this.use('Mustache', 'ms');

  this.get('#/admin/account', function(context) {
    context.partial('/templates/admin/account.ms')
      .then(function() {
        buttonEvent();
        getDataEvent();
        producePage();
      });
  });
});

function buttonEvent() {
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

function getDataEvent() {

}

function producePage() {
  var text = '';
  var i;
  var j;

  for(i = Math.floor(PageNow / 10) * 10, j = 0; i <= PageLength && j < 10; i++, j++) {
    if(i != PageNow - 1) {
      text += '<li class="waves-effect"><a href="#!">';
    } else {
      text += '<li class="active"><a href="#!">';
    }
    text += i + 1;
    text += '</a></li>';
  }
  $('#account_container').find('.page_prev')
    .after(text);
}
