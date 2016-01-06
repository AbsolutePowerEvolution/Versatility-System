(function() {
  'use strict';
  var Sammy = require('sammy');
  var api = require('../../lib/fetch-plus');

  Sammy('#main', function(app) {
    app.get('#/user/signin', function(context) {
      context.partial('/templates/user/signin.ms')
        .then(() => {
          console.log('render');
        });
    });

    app.post('#/user/signin', function(context) {
      let params = Object.assign({}, context.params);
      api.add('auth/login', {
        body: $.param(params)
      }).then((data) => {
        console.log(data);
        if(data.status) {
          if(data.is_manager) {
            context.redirect('#/admin/examine');
          } else if(data.is_student) {
            context.redirect('#/user/loan');
          }
        } else {
          Materialize.toast('帳號 or 密碼錯誤');
        }
      }).catch((response) => {
        Materialize.toast('伺服器錯誤');
      });
      return false;
    });
  });
}).call(this);
