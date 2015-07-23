var gulp          = require('gulp');
var fs            = require('fs');
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
var insert        = require('gulp-insert');
var jeditor       = require("gulp-json-editor");
var shell         = require("gulp-shell");
var grock         = require("grock");
var babel         = require("gulp-babel");

var devFolder   = '', distFolder  = '', currentVersion = 0;
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
          .pipe(changed(paths.dist.tests, { extension: '.js'}))
          .pipe(coffeelint())
          .pipe(coffeelint.reporter())
          .pipe(coffee())
          .pipe(gulp.dest(paths.dist.tests))
          // .pipe(livereload())
  });

gulp.task('stylus', function(){
  return gulp.src(devFolder + 'css/main.styl')
          .pipe(plumber())
          .pipe(stylus())
          .pipe(autoprefixer('last 4 version'))
          .pipe(gulp.dest(paths.dist.css))
          .pipe(livereload())
  });

// function s(o,u){if(!n[o]){if(!t[o]
var startString    = 'function s(o,u){if(!n[o])',
    startString2   = 'if(typeof exports==="object"&&typeof module!=="undefined")'
    startString3   = 'function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; }'
    istanbulIgnore = '/* istanbul ignore next */\n',
    regex = new RegExp('\/\* istanbul ignore next \*\/', 'gm');

var credits = ''
gulp.task('coffeeify', function(e){
  return gulp.src(['js/mojs.coffee'])
    .pipe(plumber())
    .pipe(coffeeify({options: {
      standalone: 'yes'
      // debug: true
    }}))
    // remove browserfy sudo code
    .pipe(rename('mo.spec.js'))
    .pipe(insert.transform(function(contents) {
      contents = contents.replace(startString3, istanbulIgnore+startString3);
      contents = contents.replace(startString2, istanbulIgnore+startString2);
      return contents.replace(startString, istanbulIgnore+startString);
    }))
    .pipe(gulp.dest('./spec'))

    .pipe(rename('mo.js'))
    .pipe(insert.transform(function(contents) {
      var str = contents.replace(/\/\* istanbul ignore next \*\//gm, '\r\r');
      str = str.replace(/^\s*[\r\n]/gm, '\n');
      return credits + str;
    }))
    .pipe(gulp.dest('./build'))
    .pipe(livereload())

    .pipe(uglify())
    .pipe(insert.transform(function(contents) {
      return credits + contents;
    }))
    .pipe(rename('mo.min.js'))
    .pipe(gulp.dest('./build'))
  });

gulp.task('lib', function(e){
  return gulp.src(paths.src.js)
    .pipe(plumber())
    .pipe(coffee())
    // remove browserfy sudo code
    .pipe(gulp.dest('lib/'))
  });

gulp.task('docs', function(e){
  // gulp.src('js/**/*.coffee')
  //   .pipe(insert.transform(function(contents) {
  //     contents.replace(/\/\* istanbul ignore next \*\//gm, '\r\r');
  //   });
  return gulp.src('').pipe(shell('grock'));
});

gulp.task('coffee-lint', function(e){
  return gulp.src(paths.src.js)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(changed(paths.src.js), { extension: '.js'} )
    .pipe(coffeelint({no_trailing_whitespace:{ allowed_in_comments: true } }))
    .pipe(coffeelint.reporter())
    // .pipe(coffeelint.reporter('fail'))
  });

gulp.task('index:jade', function(e){
  return gulp.src(paths.src.index)
          .pipe(plumber())
          .pipe(jade({pretty:true}))
          .pipe(gulp.dest(paths.dist.index))
          .pipe(livereload())
  });

gulp.task('update-version', function() {
  sequence('get-current-version', 'update-bower-version', 'update-main-file-version', 'coffeeify');
  });

gulp.task('get-current-version', function(e){
  return gulp.src('package.json')
          .pipe(plumber())
          .pipe(jeditor(function (json) {
            currentVersion = json.version;
            credits = '/*! \n\t:: mo · js :: motion graphics toolbelt for the web\n\tOleg Solomka @LegoMushroom 2015 MIT\n\t' + currentVersion + ' \n*/\n\n'
            return json;
          }))
  });

gulp.task('update-bower-version', function(e){
  return gulp.src('bower.json')
          .pipe(plumber())
          .pipe(jeditor(function (json) {
            json.version = currentVersion;
            return json;
          }))
          .pipe(gulp.dest(''))
  });

gulp.task('update-main-file-version', function(e){
  return gulp.src('js/mojs.coffee')
          .pipe(plumber())
          .pipe(insert.transform(function(contents) {
            var newString =  'revision:   \''+currentVersion+'\'';
            return contents
              .replace(/revision\:\s+?(\'|\")\d+\.\d+\.+\d+(\'|\")/i, newString);
          }))
          // .pipe(rename('mojs.coffee'))
          .pipe(gulp.dest('js/'))
  });

gulp.task('default', function(){
  var server = livereload();
  gulp.run('get-current-version');
  gulp.watch(paths.src.tests,['coffee:tests']);
  gulp.watch(paths.src.css,  ['stylus']);
  gulp.watch(paths.src.js,   ['coffeeify', 'coffee-lint', 'docs', 'lib']);
  gulp.watch(paths.src.index,['index:jade']);
  gulp.watch('package.json', ['update-version']);
  });








