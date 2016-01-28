var Sammy = require('sammy');
var lodash = require('lodash');
var validate = require('validate.js');
var moment = require('moment');
var when = require('when');
var api = require('../../lib/fetch-plus');
var ValidationError = require('../../lib/validation-error');

import Vue from 'vue';
import Setting from '../../../components/setting.vue';

validate.validators.daterange = (value, opts) => {
  return new when.Promise((resolve) => {
    if(opts.latest) {
      let lastestDate = moment($(`#${opts.latest}`).val());
      if(lastestDate.isSameOrBefore(value)) {
        resolve();
      } else {
        resolve('^必須大於等於開始時間');
      }
    }
  });
};

const SETTING_RULE = {
  time_name: {
    presence: {
      message: '^必填'
    }
  },
  begin_date_submit: {
    presence: {
      message: '^必填'
    }
  },
  ended_date_submit: {
    presence: {
      message: '^必填'
    },
    daterange: {
      latest: 'begin_date'
    }
  },
  stu_start: {
    presence: {
      message: '^必填'
    },
    daterange: {
      latest: 'begin_date'
    }
  },
  lab_start: {
    presence: {
      message: '^必填'
    },
    daterange: {
      latest: 'begin_date'
    }
  }
};

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

  app.put('#/admin/setting', (context) => {
    $('input').removeClass('validate invalid');
    validate.async(context.params, SETTING_RULE, {wrapErrors: ValidationError})
      .then(() => {
        let params = lodash.assign({}, context.params);
        params.began_date = params.begin_date_submit;
        params.ended_date = params.ended_date_submit;
        console.log('Validation setting');
        api.replace('manager/setting', {
          body: $.param(params)
        }).then(() => {
          Materialize.toast('更新成功');
        }).catch((error) => {
          Materialize.toast('更新失敗');
        });
      })
      .catch((err) => err.name === 'ValidationError', (error) => {
        lodash.each(error.errors, (val, key) => {
          if(key === 'begin_date_submit' || key === 'ended_date_submit') {
            key = key.slice(0, -7);
          }
          $(`#${key}`).addClass('validate invalid')
            .parent().find('label').attr('data-error', val[0]);
        });
      })
      .catch((error) => {
        console.log('System error', error);
      });
    return false;
  });
});
