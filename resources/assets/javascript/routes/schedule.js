var Sammy = require('sammy');
var when = require('when');
var moment = require('moment');
var api = require('../lib/fetch-plus.js');
var vars = require('../lib/vars.js');

var toMoment = (time) => moment(time, 'HH:mm:ss');

Sammy('#main', (app) => {
  app.get('#/schedule', (context) => {
    api.browse('manager/loan/courses')
      .then((data) => {
        let convertData = (x) => {
          x.start = toMoment(x.time_began_at);
          x.end = toMoment(x.time_ended_at);
          x.token = x.long_term_token;
          return x;
        };
        when.promise((resolve) => resolve(data.map(convertData)))
          .then((datas) => {
            let weekName = [
              'mon',
              'tue',
              'wed',
              'thu',
              'fri'
            ];
            let klass = [];

            vars.CLASS_RANGE.forEach(({start, end}) => {
              start = toMoment(start);
              end = toMoment(end);
              let genWeekSchedule = (week, course) => {
                weekName.forEach((name, idx) => {
                  week.classes[name] = week.classes[name] || [];
                  if(start.isSameOrAfter(course.start, 'minute') &&
                     end.isSameOrBefore(course.end, 'minute') &&
                     course.token[idx]) {
                    week.classes[name].push(`${course.remark}:${course.property_name}`);
                  }
                });
                return week;
              };

              let week = datas.reduce(genWeekSchedule, {
                time: `${start.format('HH:mm:ss')}~${end.format('HH:mm:ss')}`,
                classes: Object.create(null)
              });
              for(let key in week.classes) {
                week.classes[key] = week.classes[key].join('<br>');
              }
              klass.push(week);
            });
            context.list = klass;
            context.partial('/templates/schedule.ms')
              .render(() => {
                console.log('done');
              });
          });
      });
  });
});
