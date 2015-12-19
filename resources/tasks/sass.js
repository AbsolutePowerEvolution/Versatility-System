var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var productionMode = process.env.NODE_ENV === 'production';

gulp.task('sass', function() {
  return gulp.src('./resources/assets/sass/**/*.scss', {base: '.'})
    .pipe($.sourcemaps.init())
    .pipe($.sass({ importer: require('./helper/sass-importer') }))
    .pipe($.sourcemaps.write())
    .pipe($.order([
      'resources/assets/sass/app.css',
      'resources/assets/sass/**/*.css'
    ]))
    .pipe($.concat('styles.css'))
    .pipe($.if(productionMode, $.cssmin()))
    .pipe($.if(productionMode, $.rename({suffix: '.min'})))
    .pipe(gulp.dest('./public'));
});
