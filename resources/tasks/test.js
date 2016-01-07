var gulp = require('gulp');
require('babel-register');
var $ = require('gulp-load-plugins')();
var chai = require('chai');

chai.use(require('sinon-chai'));
global.expect = chai.expect;

gulp.task('tests', function() {
  gulp.src('./resources/assets/javascript/**/__tests__/*.js')
    .pipe($.mocha({
      ui: 'bdd',
    }));
});
