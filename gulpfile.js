const gulp = require('gulp');
const browserify = require('browserify');
const stringify = require('stringify');
const source = require('vinyl-source-stream');
const watchify = require('watchify');
const tsify = require('tsify');
const log = require('fancy-log');
const browserSync = require('browser-sync').create();

const browserified = browserify({
  basedir: 'src',
  debug: true,
  entries: ['startup.ts'],
  cache: {},
  packageCache: {}
})
.plugin(tsify)
.transform(stringify, {
  appliesTo: { includeExtensions: ['.html'] }
});

const watchedBrowserify = watchify(browserified);

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: '.'
    }
  });
});

function bundle(input) {
  return input
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
}

gulp.task('default', ['browser-sync'], () => {
  return bundle(watchedBrowserify)
    .pipe(browserSync.reload({ stream: true }))
    .on('update', bundle)
    .on('change', browserSync.reload)
    .on('log', log);
});
gulp.task('build', [], () => {
  return bundle(browserified)
    .on('end', () => browserified.close());
});
