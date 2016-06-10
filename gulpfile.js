var gulp        = require('gulp'),
    babelify    = require('babelify'),
    rename      = require('gulp-rename'),
    source      = require('vinyl-source-stream'),
    browserify  = require('browserify'),
    uglify      = require('gulp-uglify'),
    less        = require('gulp-less'),
    prefix      = require('gulp-autoprefixer'),
    minifyCSS   = require('gulp-clean-css'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload,
    nodemon     = require('gulp-nodemon'),
    PORT        = 7777;

//-- build css and js
gulp.task('css', function() {
  return gulp.src('app/app.less')
    .pipe(less())
    .pipe(prefix({
      cascade: true
    }))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('www/css'))
    .pipe(browserSync.stream());
});

// gulp.task('js', function() {
//   return gulp.src('app/app.js')
//     .pipe(react())
//     .pipe(babel({
//       presets: ['es2015']
//     }))
//     .pipe(browserify({
//       insertGlobals: true
//     }))
//     .pipe(rename('bundle.js'))
//     .pipe(gulp.dest('www/js'))
//     .pipe(browserSync.stream());
// });

var source = require('vinyl-source-stream');

gulp.task('js', function () {
  return browserify({entries: './app/app.js', extensions: ['.js'], debug: true})
    .transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('www/js'))
    .pipe(browserSync.stream());
});

//-- get fa and bootstrap icons
gulp.task('fa-icons', function() { 
  return gulp.src('node_modules/font-awesome/fonts/**.*') 
    .pipe(gulp.dest('www/fonts')); 
});

gulp.task('bs-icons', function() { 
  return gulp.src('node_modules/bootstrap/fonts/**.*') 
    .pipe(gulp.dest('www/fonts')); 
});

//-- minify css and uglify js
gulp.task('minify', ['css'], function() {
  return gulp.src('www/css/bundle.css')
    .pipe(minifyCSS({
      processImport: false
    }))
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest('www/css'));
});

gulp.task('uglify', ['js'], function() {
  return gulp.src('www/js/bundle.js')
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('www/js'));
});

//-- live reloading
gulp.task('live-reload', function() {
  browserSync.init({
    port: PORT,
    server: {
      baseDir: ['www/**/*.*', 'resources/**/*.*', 'resources/**/**/*.*']
    }
  });
  gulp.watch('app/css/*.less', ['css']);
  gulp.watch('app/js/*.js', ['reload-js']);
  gulp.watch('www/*.html').on('change', reload);
});

//-- live reloading with DB access
gulp.task('live-reload-with-db', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: 'http://localhost:5555',
    files: ['www/**/*.*', 'resources/**/*.*', 'resources/**/**/*.*'],
    browser: "google chrome",
    port: PORT,
  });
  gulp.watch('app/css/*.less', ['css']);
  gulp.watch('app/js/*.js', ['reload-js']);
  gulp.watch('www/*.html').on('change', reload);
});

gulp.task('reload-js', ['js'], reload);

gulp.task('nodemon', function(cb) {
  var started = false;
  return nodemon({
    script: 'server.js'
  })
  .on('start', function () {
    if (!started) {
      started = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

//-- run tasks
gulp.task('default', ['js', 'css', 'live-reload-with-db']);
gulp.task('no-db', ['js', 'css', 'live-reload']);
gulp.task('local', ['js', 'css']);
gulp.task('build', ['uglify', 'fa-icons', 'bs-icons', 'minify']);

