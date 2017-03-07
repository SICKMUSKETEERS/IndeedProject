const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const prefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;


gulp.task('styles', () => {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('javascript', () => {
  gulp.src('./js/main.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./public/scripts'))
    .pipe(reload({stream: true}));
});

gulp.task('watch', () => {
	gulp.watch('./js/*.js', ['scripts']);
	gulp.watch('./scss/**/*.scss',['styles']);
	gulp.watch('./*.html', reload);
});

gulp.task('browser-sync',() => {
	browserSync.init({
		server: './'
	})
});

gulp.task('default', ['browser-sync', 'styles', 'javascript', 'watch'])