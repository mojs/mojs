var gulp          = require('gulp');
var stylus        = require('gulp-stylus');
var autoprefixer  = require('gulp-autoprefixer');
var livereload    = require('gulp-livereload');
var coffee        = require('gulp-coffee');
var changed       = require('gulp-changed');
var watch         = require('gulp-jade');
var coffeelint    = require('gulp-coffeelint');
var plumber       = require('gulp-plumber');
var rename        = require('gulp-rename');
var uglify        = require('gulp-uglify');
var insert        = require('gulp-insert');
var jeditor       = require('gulp-json-editor');
var babel         = require('gulp-babel');

var devFolder = '', distFolder  = '', currentVersion = 0, credits = '';
var distMoFile = devFolder + 'build/mo.js';

var paths = {
  src: {
    js:       devFolder +  'js/**/*.coffee',
    babel:    devFolder +  'js/**/*.babel.js',
    index:    devFolder +  'index.jade',
    css:      devFolder +  'css/**/*.styl',
    tests:    distFolder + 'spec/**/*.coffee'
  },
  dist:{
    js:       distFolder + 'js/',
    index:    distFolder,
    css:      distFolder + 'css/',
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

gulp.task('stylus', function() {
  return gulp.src(devFolder + 'css/main.styl')
  .pipe(plumber())
  .pipe(stylus())
  .pipe(autoprefixer('last 4 version'))
  .pipe(gulp.dest(paths.dist.css))
  .pipe(livereload())
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
  })
).pipe(gulp.dest('lib/'))
});

gulp.task('minify-mo', function() {
  return gulp.src(distMoFile)
  .pipe(plumber())
  .pipe(uglify())
  .pipe(insert.transform(function(contents) {
    return credits + contents;
  }))
  .pipe(rename('mo.min.js'))
  .pipe(gulp.dest('./build'))
});

gulp.task('get-current-version', function() {
  return gulp.src('package.json')
  .pipe(plumber())
  .pipe(jeditor(function(json) {
    currentVersion = json.version;
    credits = '/*! \n\t:: mo · js :: motion graphics toolbelt for the web\n\tOleg Solomka @LegoMushroom 2015 MIT\n\t' + currentVersion + ' \n*/\n\n'
    return json;
  }))
});

gulp.task('update-bower-version', function() {
  return gulp.src('bower.json')
  .pipe(plumber())
  .pipe(jeditor(function(json) {
    json.version = currentVersion;
    return json;
  }))
  .pipe(gulp.dest('.'))
});

gulp.task('update-main-file-version', function() {
  return gulp.src('js/mojs.babel.js')
  .pipe(plumber())
  .pipe(insert.transform(function(contents) {
    var newString =  'revision:   \''+currentVersion+'\'';
    return contents
    .replace(/revision\:\s+?(\'|\")\d+\.\d+\.+\d+(\'|\")/i, newString);
  }))
  .pipe(gulp.dest('js/'))
});

gulp.task('update-version', gulp.series(
  'get-current-version',
  'update-bower-version',
  'update-main-file-version')
);

gulp.task('default', function() {
  var server = livereload();
  gulp.series('get-current-version');
  gulp.watch(paths.src.tests, gulp.series(['coffee:tests']));
  gulp.watch(paths.src.css, gulp.series(['stylus']));
  // gulp.watch(paths.src.js, gulp.series(['coffeeify', 'coffee-lint', 'docs', 'lib']));
  // gulp.watch(paths.src.js, gulp.series(['lib', 'babel-lib']));
  // gulp.watch(paths.src.babel, gulp.series(['lib', 'babel-lib']));
  gulp.watch(distMoFile, gulp.series(['minify-mo']));
  gulp.watch('package.json', gulp.series(['update-version']));
});
