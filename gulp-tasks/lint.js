module.exports = function lint(gulp, plugins, paths) {
  const eslint = plugins.eslint;

  return function () {
    return gulp.src(`${paths.src.js}/**/*.js`)
      .pipe(plugins.debug())
      .pipe(eslint())
      .pipe(eslint.format());
  };
};
