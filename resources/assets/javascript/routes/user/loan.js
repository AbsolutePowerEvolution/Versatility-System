var Sammy = require('sammy');

Sammy('#main', function() {
  this.use('Mustache', 'ms');

  this.get('#/user/loan', function(context) {
    context.partial('/templates/user/loan.ms')
      .then(function() {
        dateEvent();
      });
  });
});

function dateEvent() {
  var picker = new Pikaday({
    field: document.getElementById('datepicker'),
    bound: false
  });
}
