var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', ['lint'], function() {
  browserify()
    .add('./resources/assets/javascript/main.js', {debug: true})
    .transform(babelify.configure({
      presets: ['es2015', 'stage-0']
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public'));
});
