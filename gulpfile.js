var gulp          = require('gulp');
var minifycss     = require('gulp-minify-css');
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
var karma         = require('gulp-karma');
var concat        = require('gulp-concat');
var csslint       = require('gulp-csslint');
var browserify    = require('gulp-browserify');
var rename        = require('gulp-rename');
var uglify        = require('gulp-uglify');

var devFolder   = '';
var distFolder  = '';

var testFiles = [ 'tests/**/*.js' ];

var paths = {
  src: {
    js:       devFolder + 'js/**/*.coffee',
    css:      devFolder + 'css/**/*.styl',
    kit:      devFolder + 'css/kit.jade',
    index:    devFolder + 'index.jade',
    partials: devFolder + 'css/partials/**/*.jade',
    templates:devFolder + 'templates/**/*.jade',
    tests:    distFolder + 'tests/**/*.coffee'
  },
  dist:{
    js:       distFolder + 'js/',
    tests:    distFolder + 'tests/',
    css:      distFolder + 'css/',
    kit:      distFolder + 'css/',
    index:    distFolder
  }
}
              
gulp.task('build', function(){
  return gulp.src(paths.src.js)
          .pipe(concat('main.min.js'))
          .pipe(gulp.dest(distFolder+'js/'))
});

gulp.task('stylus', function(){
  return gulp.src(devFolder + 'css/main.styl')
          .pipe(plumber())
          .pipe(stylus())
          .pipe(autoprefixer('last 4 version'))
          // .pipe(csslint())
          // .pipe(csslint.reporter())
          // .pipe(minifycss())
          .pipe(gulp.dest(paths.dist.css))
          .pipe(livereload())
});


gulp.task('coffee', function(e){
  return gulp.src('js/charites.coffee', { read: false })
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(browserify({
      transform:  ['coffeeify'],
      extensions: ['.coffee']
    }))
    .pipe(rename('charites.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(uglify())
    .pipe(rename('charites.min.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(livereload())

});

gulp.task('coffee-lint', function(e){
  return gulp.src(paths.src.js)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(changed(paths.src.js), { extension: '.js'} )
    .pipe(coffeelint())
    .pipe(coffeelint.reporter())
    .pipe(coffeelint.reporter('fail'))
});

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

gulp.task('kit:jade', function(e){
  return gulp.src(paths.src.kit)
          .pipe(plumber())
          .pipe(jade({pretty:true}))
          .pipe(gulp.dest(paths.dist.kit))
          .pipe(livereload())
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

  gulp.watch(paths.src.css, function(e){
    gulp.run('stylus');
  });

  gulp.watch(paths.src.js, ['coffee', 'coffee-lint']);

  gulp.watch(paths.src.tests, function(e){
    gulp.run('coffee:tests');
    // server.changed(e.path)
  });

  gulp.watch(paths.src.kit, function(e){
    gulp.run('kit:jade');
  });

  gulp.watch(paths.src.index, function(e){
    gulp.run('index:jade');
  });

  gulp.watch(paths.src.partials, function(e){
    gulp.run('kit:jade');
    gulp.run('index:jade');
  });

  gulp.watch(paths.src.templates, function(e){
    gulp.run('index:jade');
  });
});








