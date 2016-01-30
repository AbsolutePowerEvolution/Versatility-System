require('babel-register');
var gulp = require('gulp');
require('./resources/tasks');

gulp.task('default', ['build']);
