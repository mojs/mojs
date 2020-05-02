var gulp          = require('gulp');
var babel         = require('gulp-babel');
var changed       = require('gulp-changed');
var coffee        = require('gulp-coffee');
var coffeelint    = require('gulp-coffeelint');
var plumber       = require('gulp-plumber');
var rename        = require('gulp-rename');

var devFolder = '', distFolder  = '';

var paths = {
  src: {
    js:       devFolder +  'src/**/*.coffee',
    babel:    devFolder +  'src/**/*.babel.js',
    tests:    distFolder + 'spec/**/*.coffee'
  },
  dist: {
    tests:    distFolder + 'spec/'
  }
}

gulp.task('coffee:tests', function() {
  return gulp.src(paths.src.tests)
  .pipe(plumber())
  .pipe(changed(paths.dist.tests, { extension: '.js'}))
  .pipe(coffeelint())
  .pipe(coffeelint.reporter())
  .pipe(coffee())
  .pipe(gulp.dest(paths.dist.tests))
});

gulp.task('lib', function() {
  return gulp.src(paths.src.js)
  .pipe(plumber())
  .pipe(coffee())
  .pipe(gulp.dest('lib/'))
});

gulp.task('babel-lib', function() {
  return gulp.src(paths.src.babel)
  .pipe(plumber())
  .pipe(babel({
    presets: ['@babel/env'],
    plugins: ['@babel/transform-runtime']
  }))
  .pipe(rename(function(path) {
    return path.basename = path.basename.replace('.babel', '');
  }))
  .pipe(gulp.dest('lib/'))
});

gulp.task('default', function() {
  gulp.watch(paths.src.tests, gulp.series(['coffee:tests']));
});
