import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import chai from 'chai';

let $ = loadPlugins();

chai.use(require('sinon-chai'));
global.expect = chai.expect;

gulp.task('tests', () => {
  gulp.src('./resources/assets/javascript/**/__tests__/*.js')
    .pipe($.mocha({
      ui: 'bdd',
    }));
});
