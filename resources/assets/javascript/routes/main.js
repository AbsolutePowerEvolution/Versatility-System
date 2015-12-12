var Sammy = require('sammy');

Sammy('#root', function() {
  this.get('#/', function(context) {
    context.redirect('#/user/signin');
  });
});
