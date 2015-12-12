module.exports = function(url, prev, done) {
  if(url.startsWith('~')) {
    try {
      var file = require.resolve(url.slice(1));
      done({ file: file });
    } catch(e) {
      done(e);
    }
  } else {
    done({ file: url });
  }
};
