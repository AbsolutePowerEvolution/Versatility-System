import gulp from 'gulp';

gulp.task('watch', () => {
  gulp.watch(['./resources/assets/**/*.{js,vue}'], ['js']);
  gulp.watch('./resources/assets/**/*.scss', ['sass']);
});
