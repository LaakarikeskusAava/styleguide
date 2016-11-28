var gulp = require('gulp');
var path = require('path');
var compass= require('gulp-compass');
var del = require('del');
var runSequence = require('run-sequence');
var kss = require('kss');

var options = {};

options.rootPath = {
  project: __dirname + '/',
  styleGuide: __dirname + '/styleguide/',
  styles: __dirname + '/styles/',
};

options.styleGuide = {
  source: [
    options.rootPath.styles
  ],
  builder: 'builder/twig',
  namespace: 'aava',
  destination: options.rootPath.styleGuide,
  mask: /\.sass|\.scss/,
  css: [
    'public/styles.css'
  ],
  js: [],
  homepage: 'styleguide.md',
  title: 'Aava Styleguide'
};

gulp.task('clean', function() {
  return del(['styleguide']);
});

gulp.task('styleguide', ['clean'], function() {
  return kss(options.styleGuide);
});

gulp.task('compass', function() {
  return gulp.src('./styles/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'styleguide/public',
      sass: 'styles'
    }))
    .pipe(gulp.dest('app/assets/temp'));
});
gulp.task('images', function() {
  gulp.src(['styles/images/**'])
    .pipe(gulp.dest('styleguide/public/images'));
});

gulp.task('default', function() {
  runSequence(['clean', 'styleguide'], 'compass', 'images');
});
