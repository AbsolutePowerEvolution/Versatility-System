import Sammy from 'sammy';
import Vue from 'vue';
import lodash from 'lodash';
import Examine from '../../../components/examine.vue';

Sammy('#main', function() {
  this.get('#/admin/examine', (context) => {
    context.partial('/templates/vue.ms')
      .then(() => {
        let query = lodash.omit(Object.assign({}, context.params), 'page');
        let page = context.params.page || 1;
        let baseUrl = '#/admin/examine';
        let App = Vue.extend({
          template: `<examine v-ref:examine :query="query"
            :current-page="${page}" base-url="${baseUrl}"></examine>`,
          components: {Examine},
          data() {
            return {query};
          },
          compiled() {
            let examine = this.$refs.examine;
            examine.$on('verify-success', () => {
              Materialize.toast('更新成功', 500);
            });
            examine.$on('verify-error', (error) => {
              console.warn(error);
              Materialize.toast('更新失敗', 500);
            });
          }
        });
        new Vue({
          el: '#main',
          components: {App}
        });
      });
  });
});
