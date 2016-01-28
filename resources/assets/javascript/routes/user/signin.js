var Sammy = require('sammy');
var api = require('../../lib/fetch-plus');

import Signin from '../../../components/signin.vue';

Sammy('#main', function(app) {
  app.get('#/user/signin', function(context) {
    context.partial('/templates/vue.ms')
      .then(() => {
        let App = Vue.extend({
          template: '<signin v-ref:signin></signin>',
          components: { Signin },
          compiled() {
            let signin = this.$refs.signin;
            signin.$on('login', (type) => {
              if(type === signin.USER) {
                context.redirect('#/user/loan');
              } else {
                context.redirect('#/admin/examine');
              }
            });

            signin.$on('fail', () => {
              Materialize.toast('帳號 or 密碼錯誤', 500);
            });

            signin.$on('error', () => {
              Materialize.toast('伺服器錯誤', 500);
            });
          }
        });

        new Vue({
          el: '#main',
          components: { App }
        });
      });
  });
});
