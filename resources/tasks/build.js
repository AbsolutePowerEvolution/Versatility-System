var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('build', ['lint'], function() {
  browserify('./resources/assets/main.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public'));
});
