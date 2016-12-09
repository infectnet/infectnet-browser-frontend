module.exports = function game(gulp, plugins, paths) {
  return function task() {
    return gulp.src(`${paths.src.game}/**`)
      .pipe(gulp.dest(paths.dist.game));
  };
};
