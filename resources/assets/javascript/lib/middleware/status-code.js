import when from 'when';

// P2P-style unjustifed status code check

export default (() => (response) => {
  if(typeof response.body === 'object' && response.body.status) {
    if(response.body.status !== 0) {
      return when.reject(response);
    }
  }
  return response;
});
