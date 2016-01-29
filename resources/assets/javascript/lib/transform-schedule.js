import when from 'when';
import moment from 'moment';

import { CLASS_RANGE } from './vars';

/**
 * Convert time string to moment object
 *
 * @param {String} time - time string
 */
let toMoment = (time) => moment(time, 'HH:mm:ss');

/**
 * Convert data to more useful format
 *
 * @param {Object} x - data object
 */
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

/**
 * Check course time is in range
 *
 * @param {Object} course - course object
 * @param {Object} start - moment object for start time
 * @param {Object} end - moment object for end time
 */
let isInRange = (course, start, end) => {
  return start.isSameOrAfter(course.start, 'minute') &&
    end.isSameOrBefore(course.end, 'minute');
};

/**
 * Transform raw data from server
 *
 * @param {Object} data - data from server /api/manager/loan/courses
 */
export default (data) => {
  return when.promise((resolve) => resolve(data.map(convertData)))
    .then((datas) => {
      let klass = [];

      CLASS_RANGE.forEach(({start, end}) => {
        start = toMoment(start);
        end = toMoment(end);

        /**
         * Collect course in time range for a week
         *
         * @param {Object} week - a object for week
         * @param {Object} course - course data
         */
        let genWeekSchedule = (week, course) => {
          weekName.forEach((name, idx) => {
            // If not initialize then init with array
            week[name] = week[name] || [];
            // If in range and at that day, ref server side api
            if(isInRange(course, start, end) &&
               course.token[idx]) {
              week[name].push(`${course.remark}:${course.property_name}`);
            }
          });
          return week;
        };

        // Generate a week schedule in range
        let week = datas.reduce(genWeekSchedule, {
          time: `${start.format('HH:mm:ss')}~${end.format('HH:mm:ss')}`,
        });

        weekName.forEach((key) => {
          week[key] = week[key].join('<br>');
        });

        // Collect it
        klass.push(week);
      });
      return klass;
    });
};
