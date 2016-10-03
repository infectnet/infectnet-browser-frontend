module.exports = function css(gulp, plugins, paths) {
  return function task() {
    return gulp.src(`${paths.src.css}/*.css`)
      .pipe(gulp.dest(paths.dist.css));
  };
};
