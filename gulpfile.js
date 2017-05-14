var gulp = require('gulp'),
  sass = require('gulp-sass'),
  del = require('del'),
  injectPartials = require('gulp-inject-partials'),
  browserSync = require('browser-sync').create(),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify');

gulp.task('clean', function() {
  del.sync('./prod/**/*');
});

gulp.task('sass', function() {
  gulp.src('src/components/stylesheet/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('copyFiles', function() {
  return gulp.src(['src/*.png', 'src/*.txt', 'src/*.ico', 'src/css/**/*', 'src/fonts/**/*', 'src/js/**/*', 'src/images/**/*', 'src/components/layout/**/*', '!./**/README.md'], {
    base: 'src'
  }).pipe(gulp.dest('prod'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    browser: ['chrome'],
    server: { baseDir: 'dev' }
  });
});

gulp.task('minCss', ['sass'], function() {
  return gulp.src('src/css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('dev/css'));
});

gulp.task('minJs', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dev/js'));
});

gulp.task('copyDevFiles', ['sass'], function() {
  gulp.src('src/css/**/*.css')
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dev/css'));

  gulp.src(['src/*.png', 'src/*.txt', 'src/*.ico']).pipe(gulp.dest('dev'));
  gulp.src('src/js/**/*.js').pipe(gulp.dest('dev/js'));
  gulp.src(['src/images/**/*', '!./**/README.md']).pipe(gulp.dest('dev/images'));
  gulp.src(['src/fonts/**/*', '!./**/README.md']).pipe(gulp.dest('dev/fonts'));
});

gulp.task('buildHTML', function() {
  return gulp.src('src/*.html')
    .pipe(injectPartials({
      removeTags: true
    }))
    .pipe(gulp.dest('dev'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('default', ['clean', 'copyDevFiles', 'minCss', 'minJs', 'buildHTML', 'copyFiles'], function() {
  return gulp.src('src/index.html')
    .pipe(injectPartials({
      removeTags: true
    }))
    .pipe(gulp.dest('prod'));
});

gulp.task('serve', ['clean', 'copyDevFiles', 'copyFiles', 'buildHTML', 'browserSync', 'sass'], function() {
  gulp.watch('src/**/*.{js,svg,png,jpg,jpeg}', ['copyFiles', 'buildHTML'], function() {
    browserSync.reload();
  });
  gulp.watch('src/**/*.html', ['buildHTML'], function() {
    browserSync.reload();
  });
  gulp.watch('src/**/*.{css,scss}', ['copyDevFiles']);
});
