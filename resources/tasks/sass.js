var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

var productionMode = process.env.NODE_ENV === 'production';

gulp.task('sass', function() {
  return gulp.src('./resources/assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ importer: require('./helper/sass-importer') }))
    .pipe(sourcemaps.write())
    .pipe(concat('styles.css'))
    .pipe(gulpif(productionMode, cssmin()))
    .pipe(gulpif(productionMode, rename({suffix: '.min'})))
    .pipe(gulp.dest('./public'));
});
