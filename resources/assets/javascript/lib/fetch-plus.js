import { connectEndpoint } from 'fetch-plus';
import plusCsrf from 'fetch-plus-csrf';
import when from 'when';

let token = $('#csrf-token').attr('content');
const FORM_HEADER = 'application/x-www-form-urlencoded; charset=UTF-8';
const JSON_HEADER = 'application/json; charset=UTF-8';
var api = connectEndpoint('/api');

api.addMiddleware(plusCsrf('X-CSRF-TOKEN', token));

// Default add cookie default
api.addMiddleware((request) => {
  if(request.options.credentials) {
    request.options.credentials = 'include';
  }
});

// custom JSON middleware
api.addMiddleware((request) => {
  let body = request.options.body;
  // If options have key named type
  if(request.options.type && typeof body === 'object') {
    // Stringify body and add header
    if(request.options.type === 'form') {
      request.options.body = $.param(body);
      request.options.headers['Content-Type'] = FORM_HEADER;
    } else if(request.options.type === 'json') {
      request.options.body = JSON.stringify(body);
      request.options.headers['Content-Type'] = JSON_HEADER;
    }
  } else if(typeof request.options.body === 'string') {
    // Just add header
    request.options.headers['Content-Type'] = FORM_HEADER;
  } else if(typeof request.options.body === 'object') {
    // Stringify body and add header
    request.options.body = $.param(body);
    request.options.headers['Content-Type'] = FORM_HEADER;
  }

  return (response) => {
    return response.json();
  };
});

// P2P-style unjustifed status code check
api.addMiddleware(() => (response) => {
  if(typeof response.body === 'object' && response.body.status) {
    if(response.body.status !== 0) {
      return when.reject(response);
    }
  }
  return response;
});

module.exports = api;
