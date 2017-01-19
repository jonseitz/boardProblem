var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  bs = require('browser-sync'),
  plumber = require('gulp-plumber');

/*****
 * build
 *****/

gulp.task('buildApp', function () {
  return gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('docs'))
    .pipe(bs.reload({stream: true}));
});
gulp.task('buildVendor', function () {
  return gulp.src('bower_components/**/*.min.js')
    .pipe(plumber())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('docs'));
});
gulp.task('vendorCSS', function() {
  return gulp.src('bower_components/**/*.css')
    .pipe(plumber())
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('docs'));
});
gulp.task('appCSS', function() {
  return gulp.src('src/css/*.css')
    .pipe(plumber())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('docs'))
    .pipe(bs.reload({stream: true}));
});
gulp.task('moveHTML', function() {
  return gulp.src('src/*.html')
    .pipe(plumber())
    .pipe(gulp.dest('docs'))
    .pipe(bs.reload({stream: true}));
});

gulp.task('build', ['buildApp', 'buildVendor', 'vendorCSS', 'appCSS', 'moveHTML']);


/*****
 * watch
 *****/

gulp.task('browser-sync', function() {
  return bs.init({
    server: {
      baseDir: './docs'
    }
  });
});

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('src/js/*.js', ['buildApp']);
  gulp.watch('src/css/*.css', ['appCSS']);
  gulp.watch('src/*.html', ['moveHTML']);

});


/*****
 * default
 *****/

gulp.task('default', ['build', 'watch']);