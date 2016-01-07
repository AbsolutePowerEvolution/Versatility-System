var FORM_HEADER = 'application/x-www-form-urlencoded; charset=UTF-8';
var JSON_HEADER = 'application/json; charset=UTF-8';

// custom JSON middleware
module.exports = ((request) => {
  var body = request.options.body;
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
