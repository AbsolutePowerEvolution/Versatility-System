import Sammy from 'sammy';

import Vue from 'vue';
import Schedule from '../../components/schedule.vue';

Sammy('#main', (app) => {
  app.get('#/schedule', (context) => {
    context.partial('/templates/vue.ms')
      .then(() => {
        let App = Vue.extend({
          template: '<schedule></schedule>',
          components: { Schedule }
        });

        new Vue({
          el: '#main',
          components: { App }
        });
      });
  });
});
