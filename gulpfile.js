const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger');
const imagemin = require('gulp-imagemin');
const webpack = require('webpack-stream');



const cssFiles = [
  'src/styles/main.scss'
 
];
const htmlFiles = [
  'src/views/index.html'
 
];

let webConfig={
output: {
  filename: 'all.js'
}
};

function html() {
  return gulp.src(htmlFiles) //Выберем файлы по нужному пути
      .pipe(rigger()) //Прогоним через rigger
      .pipe(gulp.dest('build/')) //выгрузим их в папку build
      .pipe(browserSync.stream()); //И перезагрузим наш сервер для обновлений
};


function styles() {
  return gulp.src(cssFiles)
  .pipe(sourcemaps.init())
  .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
      browsers: ['>0.1%'],
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'))

    .pipe(browserSync.stream());

}



function scripts() {
  return gulp.src('src/js/index.js')
    .pipe(webpack(webConfig))
    

    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());

}


function imgs(){
  return gulp.src('src/images/*.+(jpg|jpeg|png|gif)')
      .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          interlaced: true
      }))
      .pipe(gulp.dest('build/images'))
};


function clean() {
  return del(['build/*'])
}




function watch() {
  browserSync.init({
    server: {
      baseDir: "build/"
    },
    tunnel: true
  })
 gulp.watch('src/**/*.html', html)
  gulp.watch('src/**/*.css', styles)
  gulp.watch('src/**/*.scss', styles)

  gulp.watch('src/**/*.js', scripts)

   gulp.watch("./src/**/*.html").on('change', browserSync.reload);
}


gulp.task('html', html);

gulp.task('styles', styles);

gulp.task('scripts', scripts);

gulp.task('imgs', imgs);

gulp.task('del', clean);

gulp.task('watch', watch);

let build = gulp.series(clean, 
  gulp.parallel(html, styles, scripts, imgs));

gulp.task('build', build);

gulp.task('dev', gulp.series('build', 'watch'));