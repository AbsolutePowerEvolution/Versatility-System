// Default add cookie
export default ((request) => {
  if(!request.options.credentials) {
    request.options.credentials = 'include';
  }
});
