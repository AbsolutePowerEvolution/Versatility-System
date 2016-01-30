import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import importer from './helper/sass-importer';

let $ = loadPlugins();

let productionMode = process.env.NODE_ENV === 'production';

gulp.task('sass', () => {
  return gulp.src('./resources/assets/sass/**/*.scss', {base: '.'})
    .pipe($.if(!productionMode, $.sourcemaps.init()))
    .pipe($.sass({ importer }))
    .pipe($.if(!productionMode, $.sourcemaps.write()))
    .pipe($.order([
      'resources/assets/sass/app.css',
      'resources/assets/sass/**/*.css'
    ]))
    .pipe($.concat('styles.css'))
    .pipe($.if(productionMode, $.cssmin()))
    .pipe(gulp.dest('./public/assets/css'));
});
