// Default add cookie
module.exports = ((request) => {
  if(!request.options.credentials) {
    request.options.credentials = 'include';
  }
});
