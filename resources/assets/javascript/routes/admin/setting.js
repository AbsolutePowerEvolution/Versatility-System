var Sammy = require('sammy');
var lodash = require('lodash');
var validate = require('validate.js');
var moment = require('moment');
var when = require('when');
var api = require('../../lib/fetch-plus');
var ValidationError = require('../../lib/validation-error');

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
    api.read('manager/setting')
      .then((data) => {
        console.log(data);
        lodash.assign(context, lodash.omit(data, (x) => !!!x));
        context.loadPartials({menu: '/templates/admin/menu.ms'})
          .partial('/templates/admin/setting.ms')
          .render(() => {
            $('.datepicker').each((_idx, ele) => {
              $(ele).pickadate({
                format: 'yyyy-mm-dd',
                formatSubmit: 'yyyy-mm-dd',
                closeOnSelect: true,
                closeOnClear: true,
                onClose: () => {
                  console.log('Close');
                  ele.blur();
                }});
            });
          });
      });
  });

  app.put('#/admin/setting', (context) => {
    console.log(context);
    $('input').removeClass('validate invalid');
    validate.async(context.params, SETTING_RULE, {wrapErrors: ValidationError})
      .then(() => {
        console.log('Validation setting');
      })
      .catch((err) => err.name === 'ValidationError', (error) => {
        console.log('Validation error', error.errors);
        lodash.each(error.errors, (val, key) => {
          if(key === 'begin_date_submit' || key === 'ended_date_submit') {
            key = key.slice(0, -7);
          }
          console.log(key);
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
