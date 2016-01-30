export default (url, prev, done) => {
  if(url[0] === '~') {
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
