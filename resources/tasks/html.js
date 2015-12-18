var gulp = require('gulp');
var cdnizer = require('gulp-cdnizer');
var rename = require('gulp-rename');

gulp.task('html', function() {
  return gulp.src('./resources/assets/html/*.html')
          .pipe(cdnizer([
            'google:jquery',
            'cdnjs:materialize',
            'cdnjs:mustache',
            'cdnjs:sammy'
          ]))
          .pipe(rename({extname: '.blade.php'}))
          .pipe(gulp.dest('./resources/views'));
});
