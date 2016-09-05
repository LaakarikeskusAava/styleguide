var gulp = require('gulp');
var compass= require('gulp-compass');
var shell = require('gulp-shell');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('clean', function() {
  return del(['styleguide']);
});

gulp.task('styleguide', shell.task([
    // kss-node [source folder of files to parse] [destination folder] --template [location of template files]
    'kss-node --config <%= config %> <%= source %> <%= destination %>'
  ], {
    templateData: {
      source: 'styles',
      destination: 'styleguide',
      config: './kss-config.json'
    }
  }
));
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
