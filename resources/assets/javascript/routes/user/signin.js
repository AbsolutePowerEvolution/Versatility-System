var Sammy = require('sammy');

Sammy('#main', function() {
  this.get('#/user/signin', function(context) {
    context.partial('/templates/user/signin.ms');
  });

  this.post('#/user/signin', function(context) {
    console.log('Username: ' + context.params.username);
    console.log('Password: ' + context.params.password);
    return false;
  });
});

