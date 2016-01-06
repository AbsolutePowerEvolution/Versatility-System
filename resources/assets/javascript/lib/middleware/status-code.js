var when = require('when');

// P2P-style unjustifed status code check

module.exports = (() => (response) => {
  if(typeof response.body === 'object' && response.body.status) {
    if(response.body.status !== 0) {
      return when.reject(response);
    }
  }
  return response;
});
