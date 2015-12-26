var $ = require('jquery');
var rest = require('rest');
var pathPrefix = require('rest/interceptor/pathPrefix');
var errorCode = require('rest/interceptor/errorCode');
var mime = require('rest/interceptor/mime');
var csrf = require('rest/interceptor/csrf');
var when = require('when');
var interceptor = require('rest/interceptor');

var statusCheck = interceptor({
  response: (response, config) => {
    if(response.request.method !== 'GET' &&
        response.status.code === 200 &&
        response.entity.status !== 0) {
      return when.reject(response);
    }
    return response;
  }
});

var token = $('#csrf-token').attr('content');
var client = rest
  .wrap(pathPrefix, {prefix: '/api'})
  .wrap(errorCode)
  .wrap(mime)
  .wrap(csrf, {name: 'X-CSRF-TOKEN', token: token})
  .wrap(statusCheck);

module.exports = client;
