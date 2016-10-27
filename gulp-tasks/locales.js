module.exports = function locales(gulp, plugins, paths) {
  return function task() {
    return gulp.src(`${paths.src.locales}/**/*.json`)
      .pipe(gulp.dest(paths.dist.locales));
  };
};
