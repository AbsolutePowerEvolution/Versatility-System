var Sammy = require('sammy');
var when = require('when');
var lodash = require('lodash');
var api = require('../lib/fetch-plus.js');

Sammy('#main', (app) => {
  app.get('#/schedule', (context) => {
    api.browse('manager/loan/classrooms?type=course')
      .then((data) => {
        let promises = [];
        let isCourse = (x) => x.status.name === 'accepted' && x.type.name === 'course';
        let convertLongTermToken = (x) => {
          let token = x.long_term_token;
          if(token) {
            x.long_term_token = (parseInt(token) >>> 0)
              .toString(2).split('').map((y) => !!parseInt(y));
          }
          return x;
        };
        promises.push(when.promise((resolve) => resolve(data.data.filter(isCourse).map(convertLongTermToken))));
        lodash.range(2, data.last_page).map((i) => {
          promises.push(api.browse(`manager/loan/classrooms?type=course&page=${i}`)
              .then((data) => {
                return data.data.filter(isCourse).map(convertLongTermToken);
              }));
        });
        when.reduce(promises, (datas, data) => datas.concat(data), [])
          .then((datas) => {
            console.log(datas);
          });
      });
  });
});
