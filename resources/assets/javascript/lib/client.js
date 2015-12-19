var $ = require('jquery');
var rest = require('rest');
var pathPrefix = require('rest/interceptor/pathPrefix');
var errorCode = require('rest/interceptor/errorCode');
var mime = require('rest/interceptor/mime');
var csrf = require('rest/interceptor/csrf');

var token = $('meta[name="csrf-token"]').attr('content');
var client = rest
  .wrap(pathPrefix, {prefix: '/api'})
  .wrap(errorCode)
  .wrap(mime)
  .wrap(csrf, {name: 'X-CSRF-TOKEN', token: token});

module.exports = client;
