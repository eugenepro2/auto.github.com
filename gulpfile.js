var gulp = require('gulp'),
		pug = require('gulp-pug'),
		sass = require('gulp-sass');
    autoprefixer = require('gulp-autoprefixer');
    csscomb = require('gulp-csscomb');
    imagemin = require('gulp-imagemin');
    sourcemaps = require('gulp-sourcemaps');
    changed = require('gulp-changed');
    browserSync = require('browser-sync').create();

// Jade
gulp.task('pug', function buildHTML() {
  return gulp.src('./assets/pug/*.pug')
  .pipe(changed('./docs', {extension: '.html'}))
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./docs'))
  .pipe(browserSync.reload({stream:true}));
});
// gulp.task('pug', function(){
// 	gulp.src('./assets/pug/*.pug')
// 		.pipe(jade({
// 			pretty: true
// 		}))
// 		.pipe(gulp.dest('./public'))
// 		.pipe(connect.reload());
// });


gulp.task('sass', function () {
  return gulp.src('./assets/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(changed('./docs/', {extension: '.css'}))
    .pipe(sass({}).on('error', sass.logError))
    .pipe(csscomb())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./docs/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('image', () =>
    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./docs/img'))
);

// Minify JS
gulp.task('js', function() {
  	gulp.src('assets/**/*.js')
    .pipe(gulp.dest('./docs/'))
   	.pipe(browserSync.reload({stream:true}));
});

// Watch
gulp.task('watch', function (){
	gulp.watch('./assets/**/*.js', ['js'])
	gulp.watch('./assets/pug/**/*.pug', ['pug']);
  gulp.watch('./assets/img/*', function(event) {
    gulp.run('image');
  });
});

gulp.task('sass:watch', function () {
  gulp.watch('./assets/**/*.sass', ['sass']);
});

// Server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "docs"
        }
    });
});

gulp.task('default', ['pug', 'sass', 'js', 'watch', 'sass:watch', 'browser-sync', 'image'])