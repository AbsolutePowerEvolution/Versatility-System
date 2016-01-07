var $ =  require('jquery');
var connectEndpoint = require('fetch-plus').connectEndpoint;
var plusCsrf = require('fetch-plus-csrf');

var cookie = require('./middleware/cookie');
var param = require('./middleware/param');
var header = require('./middleware/header');
var statusCode = require('./middleware/status-code');

var token = $('#csrf-token').attr('content');
var api = connectEndpoint('/api');

api.addMiddleware(plusCsrf('X-CSRF-TOKEN', token));
api.addMiddleware(cookie);
api.addMiddleware(param);
api.addMiddleware(header);
api.addMiddleware(statusCode);

module.exports = api;
