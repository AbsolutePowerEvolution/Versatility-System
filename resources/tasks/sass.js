var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var productionMode = process.env.NODE_ENV === 'production';

gulp.task('sass', function() {
  return gulp.src('./resources/assets/sass/**/*.scss', {base: '.'})
    .pipe($.if(!productionMode, $.sourcemaps.init()))
    .pipe($.sass({ importer: require('./helper/sass-importer') }))
    .pipe($.if(!productionMode, $.sourcemaps.write()))
    .pipe($.order([
      'resources/assets/sass/app.css',
      'resources/assets/sass/**/*.css'
    ]))
    .pipe($.concat('styles.css'))
    .pipe($.if(productionMode, $.cssmin()))
    .pipe(gulp.dest('./public/assets/css'));
});
