var Sammy = require('sammy');
require('sammy/lib/plugins/sammy.mustache.js');

Sammy('#main', function() {
  this.use('mustache', 'ms');

  this.get('#/user/property', function(context) {
    console.log('property');
    context.partial('/templates/user/property.ms').then(function() {
      propertyBindEvent();
    });
  });
});

function propertyBindEvent() {
  $('#property_container #property_system').click(function() {
    $('#property_system').addClass('purple darken-4').css('color', 'white');
    $('#property_history').removeClass('purple darken-4').addClass('white').css('color', 'black');
    $('#property_system_content').css('display', 'block');
    $('#property_history_content').css('display', 'none');
  });

  $('#property_container #property_history').click(function() {
    $('#property_system').removeClass('purple darken-4').addClass('white').css('color', 'black');
    $('#property_history').addClass('purple darken-4').css('color', 'white');
    $('#property_system_content').css('display', 'none');
    $('#property_history_content').css('display', 'block');
  });

  var modalTarget;
  $('#property_container').find('.modal-trigger').on('click', function(event) {
    $('#materialize-lean-overlay-30').css('display', 'block');
    modalTarget = $(this).data('modal_target');
    $('#' + modalTarget).fadeIn();
  });

  $('#property_container').find('.modal-close, #materialize-lean-overlay-30').on('click', function(event) {
    $('#materialize-lean-overlay-30').css('display', 'none');
    $('#' + modalTarget).fadeOut();
  });
}
