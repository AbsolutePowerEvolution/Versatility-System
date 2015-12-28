import $ from 'jquery';
import { connectEndpoint } from 'fetch-plus';
import plusCsrf from 'fetch-plus-csrf';

import cookie from './middleware/cookie';
import param from './middleware/param';
import header from './middleware/header';
import statusCode from './middleware/status-code';

let token = $('#csrf-token').attr('content');
var api = connectEndpoint('/api');

api.addMiddleware(plusCsrf('X-CSRF-TOKEN', token));
api.addMiddleware(cookie);
api.addMiddleware(param);
api.addMiddleware(header);
api.addMiddleware(statusCode);

module.exports = api;
