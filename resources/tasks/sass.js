var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

gulp.task('sass', function() {
  return gulp.src('./resources/assets/sass/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ importer: require('./helper/sass-importer') }))
    .pipe(sourcemaps.write())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('./public'));
});
