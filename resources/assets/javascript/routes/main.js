var Sammy = require('sammy');

Sammy('#main', function() {
  this.get('#/', function(context) {
    context.redirect('#/user/signin');
  });
});
