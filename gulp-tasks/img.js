module.exports = function img(gulp, plugins, paths) {
  return function task() {
    return gulp.src(`${paths.src.img}/**`)
      .pipe(gulp.dest(paths.dist.img));
  };
};
