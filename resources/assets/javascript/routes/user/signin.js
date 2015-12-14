var Sammy = require('sammy');
require('sammy/lib/plugins/sammy.mustache.js');

Sammy('#main', function() {
  console.log('hello');
  this.use('Mustache', 'ms');

  this.get('#/user/signin', function(context) {
    console.log('signin');
    context.partial('/templates/user/signin.ms');
  });

  this.post('#/user/signin', function(context) {
    console.log(context);
    console.log('Username: ' + context.params.username);
    console.log('Password: ' + context.params.password);
    return false;
  });
});

