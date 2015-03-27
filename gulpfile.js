var gulp          = require('gulp');
var stylus        = require('gulp-stylus');
var autoprefixer  = require('gulp-autoprefixer');
var notify        = require('gulp-notify');
var livereload    = require('gulp-livereload');
var coffee        = require('gulp-coffee');
var changed       = require('gulp-changed');
var jade          = require('gulp-jade');
var watch         = require('gulp-jade');
var coffeelint    = require('gulp-coffeelint');
var plumber       = require('gulp-plumber');
var concat        = require('gulp-concat');
var csslint       = require('gulp-csslint');
var browserify    = require('gulp-browserify');
var rename        = require('gulp-rename');
var uglify        = require('gulp-uglify');
var sequence      = require('run-sequence');
var coffeeify     = require('gulp-coffeeify');

var devFolder   = '', distFolder  = '';

var paths = {
  src: {
    js:       devFolder + 'js/**/*.coffee',
    index:    devFolder + 'index.jade',
    css:      devFolder + 'css/**/*.styl',
    tests:    distFolder + 'spec/**/*.coffee'
  },
  dist:{
    js:       distFolder + 'js/',
    index:    distFolder,
    css:      distFolder + 'css/',
    tests:    distFolder + 'spec/'
  }
}

gulp.task('coffee:tests', function(e){
  return gulp.src(paths.src.tests)
          .pipe(plumber())
          .pipe(changed(paths.src.tests))
          .pipe(coffeelint())
          .pipe(coffeelint.reporter())
          .pipe(coffee())
          .pipe(gulp.dest(paths.dist.tests))
          .pipe(livereload())
});

gulp.task('stylus', function(){
  return gulp.src(devFolder + 'css/main.styl')
          .pipe(plumber())
          .pipe(stylus())
          .pipe(autoprefixer('last 4 version'))
          .pipe(gulp.dest(paths.dist.css))
          .pipe(livereload())
});

gulp.task('coffee-all + cofee:mojs', function() {
  sequence('coffee-all', 'coffee:mojs');
});

gulp.task('coffeeify', function(e){
  return gulp.src(['js/mojs.coffee'])
    .pipe(plumber())
    .pipe(coffeeify())
    .pipe(rename('mo.js'))
    .pipe(gulp.dest('./build'))
    .pipe(livereload())
    .pipe(uglify())
    .pipe(rename('mo.min.js'))
    .pipe(gulp.dest('./build'))
});

gulp.task('coffee:mojs', function(e){
  return gulp.src('dist/mojs.js', { read: false })
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(browserify())
    .pipe(rename('mo.js'))
    .pipe(gulp.dest('./build/'))
    .pipe(gulp.src('./build/mo.js'))
    .pipe(uglify())
    .pipe(rename('mo.min.js'))
    .pipe(gulp.dest('./build/'))
    .pipe(livereload())
});

gulp.task('coffee-all', function(e){
  return gulp.src(['js/**/*.coffee'])
    .pipe(plumber())
    .pipe(coffee({ bare: true }))
    .pipe(gulp.dest('dist/'))
    // .pipe(livereload())
});

gulp.task('coffee-lint', function(e){
  return gulp.src(paths.src.js)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(changed(paths.src.js), { extension: '.js'} )
    .pipe(coffeelint())
    .pipe(coffeelint.reporter())
    .pipe(coffeelint.reporter('fail'))
});

gulp.task('index:jade', function(e){
  return gulp.src(paths.src.index)
          .pipe(plumber())
          .pipe(jade({pretty:true}))
          .pipe(gulp.dest(paths.dist.index))
          .pipe(livereload())
});

gulp.task('default', function(){
  var server = livereload();
  gulp.watch(paths.src.tests,['coffee:tests']);
  gulp.watch(paths.src.css,  ['stylus']);
  gulp.watch(paths.src.js,   ['coffeeify', 'coffee-lint']);
  gulp.watch(paths.src.index,['index:jade']);
});








