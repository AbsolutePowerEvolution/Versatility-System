var $ = require('jquery');

module.exports = ((request) => {
  if(request.options.method === 'GET' &&
      typeof request.options.params === 'object') {
    request.path = `${request.path}?${$.param(request.options.params)}`;
  }
});
