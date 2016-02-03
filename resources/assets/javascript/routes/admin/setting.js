// var validate = require('validate.js');
import Sammy from 'sammy';
import Vue from 'vue';
import Setting from '../../../components/setting.vue';

Sammy('#main', (app) => {
  app.get('#/admin/setting', (context) => {
    context.partial('/templates/vue.ms')
      .render(() => {
        new Vue({
          el: '#main',
          components: {
            app: {
              template: '<setting></setting>',
              components: { Setting }
            }
          }
        });
      });
  });
});
