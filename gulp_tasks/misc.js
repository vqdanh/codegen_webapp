const path = require('path');

const gulp = require('gulp');
const del = require('del');
const filter = require('gulp-filter');
const rename = require('gulp-rename');

const conf = require('../conf/gulp.conf');

gulp.task('clean-dist', cleanDist);
gulp.task('clean-int', cleanInt);

gulp.task('other-dist', otherDist);
gulp.task('other-int', otherInt);

function cleanDist() {
  return del([conf.paths.dist, conf.paths.tmp]);
}

function cleanInt() {
  return del([conf.paths.int, conf.paths.tmp]);
}

function otherDist() {
  const fileFilter = filter(file => file.stat.isFile());
  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join(`!${conf.paths.src}`, '/**/*.{scss,js,html}')
  ])
  .pipe(fileFilter)
  .pipe(gulp.dest(conf.paths.dist));
}


function otherInt() {
  const fileFilter = filter(file => file.stat.isFile());
  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join(`!${conf.paths.src}`, '/**/*.{scss,js,html}')
  ])
  .pipe(fileFilter)
  .pipe(gulp.dest(conf.paths.int));
}