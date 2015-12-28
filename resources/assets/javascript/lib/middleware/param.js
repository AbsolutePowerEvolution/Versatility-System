import $ from 'jquery';

export default ((request) => {
  if(request.options.method === 'GET' &&
      typeof request.options.params === 'object') {
    request.path = `${request.path}?${$.param(request.options.params)}`;
  }
});
