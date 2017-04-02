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
  styles: __dirname + '/styles/'
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
    'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.structure.css',
    'https://cdnjs.cloudflare.com/ajax/libs/chosen/1.6.2/chosen.min.css',
    'public/styles.css'
  ],
  js: [
    'https://code.jquery.com/jquery-1.12.4.js',
    'https://code.jquery.com/ui/1.12.0/jquery-ui.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/chosen/1.6.2/chosen.jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js',
    'public/javascript/components/forms/select/select.js',
    'public/javascript/components/forms/slider/slider.js'
  ],
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
gulp.task('javascript', function() {
  gulp.src(['styles/**/*.js'])
    .pipe(gulp.dest('styleguide/public/javascript'));
});

gulp.task('default', function() {
  runSequence(['clean', 'styleguide'], 'compass', 'images', 'javascript');
});
