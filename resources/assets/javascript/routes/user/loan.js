var Sammy = require('sammy');

Sammy('#main', function() {
  this.use('Mustache', 'ms');

  this.get('#/user/loan', function(context) {
    context.loadPartial({menu: '/templates/user/menu.ms'})
      .partial('/templates/user/loan.ms')
      .then(function() {
        var picker = new Pikaday({
          field: document.getElementById('datepicker'),
          bound: false
        });
      });
  });
});

