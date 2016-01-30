import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';

let $ = loadPlugins();

gulp.task('lint', () => {
  return gulp.src([
      './resources/assets/**/*.js',
      './resources/tasks/**/*.js',
      './gulpfile.js'])
    .pipe($.jscs())
    .pipe($.jscs.reporter('jscs-stylish'));
});
