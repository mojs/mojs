var gulp          = require('gulp');
var babel         = require('gulp-babel');
var changed       = require('gulp-changed');
var coffee        = require('gulp-coffee');
var coffeelint    = require('gulp-coffeelint');
var insert        = require('gulp-insert');
var jeditor       = require('gulp-json-editor');
var plumber       = require('gulp-plumber');
var rename        = require('gulp-rename');
var uglify        = require('gulp-uglify');

var devFolder = '', distFolder  = '', currentVersion = 0, credits = '';
var distMoFile = devFolder + 'build/mo.js';

var paths = {
  src: {
    js:       devFolder +  'src/**/*.coffee',
    babel:    devFolder +  'src/**/*.babel.js',
    tests:    distFolder + 'spec/**/*.coffee'
  },
  dist:{
    js:       distFolder + 'src/',
    index:    distFolder,
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

gulp.task('update-main-file-version', function() {
  return gulp.src('src/mojs.babel.js')
  .pipe(plumber())
  .pipe(insert.transform(function(contents) {
    var newString =  'revision:   \''+currentVersion+'\'';
    return contents
    .replace(/revision\:\s+?(\'|\")\d+\.\d+\.+\d+(\'|\")/i, newString);
  }))
  .pipe(gulp.dest('src/'))
});

gulp.task('update-version', gulp.series(
  'get-current-version',
  'update-main-file-version')
);

gulp.task('default', function() {
  gulp.series('get-current-version');
  gulp.watch(paths.src.tests, gulp.series(['coffee:tests']));
  // gulp.watch(paths.src.js, gulp.series(['coffeeify', 'coffee-lint', 'docs', 'lib']));
  // gulp.watch(paths.src.js, gulp.series(['lib', 'babel-lib']));
  // gulp.watch(paths.src.babel, gulp.series(['lib', 'babel-lib']));
  gulp.watch(distMoFile, gulp.series(['minify-mo']));
  gulp.watch('package.json', gulp.series(['update-version']));
});
