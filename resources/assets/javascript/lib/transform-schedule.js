import when from 'when';
import moment from 'moment';

import { CLASS_RANGE } from './vars';

var toMoment = (time) => moment(time, 'HH:mm:ss');

let convertData = (x) => {
  x.start = toMoment(x.time_began_at);
  x.end = toMoment(x.time_ended_at);
  x.token = x.long_term_token;
  return x;
};

let weekName = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri'
];

export default (data) => {
  return when.promise((resolve) => resolve(data.map(convertData)))
    .then((datas) => {
      let klass = [];

      CLASS_RANGE.forEach(({start, end}) => {
        start = toMoment(start);
        end = toMoment(end);

        let genWeekSchedule = (week, course) => {
          weekName.forEach((name, idx) => {
            week[name] = week[name] || [];
            if(start.isSameOrAfter(course.start, 'minute') &&
               end.isSameOrBefore(course.end, 'minute') &&
               course.token[idx]) {
              week[name].push(`${course.remark}:${course.property_name}`);
            }
          });
          return week;
        };

        let week = datas.reduce(genWeekSchedule, {
          time: `${start.format('HH:mm:ss')}~${end.format('HH:mm:ss')}`,
        });

        weekName.forEach((key) => {
          week[key] = week[key].join('<br>');
        });

        klass.push(week);
      });
      console.log(klass);
      return klass;
    });
};
