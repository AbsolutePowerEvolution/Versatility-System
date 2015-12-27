import { connectEndpoint } from 'fetch-plus';
import plusJson from 'fetch-plus-json';
import plusCsrf from 'fetch-plus-csrf';

let token = $('#csrf-token').attr('content');

var api = connectEndpoint('/api');
api.addMiddleware(plusCsrf('X-CSRF-TOKEN', token));
api.addMiddleware(plusJson());

api.addMiddleware((request) => ((response) => {
  console.log(request);
  console.log(response);
  return response;
}));

module.exports = api;
