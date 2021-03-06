module.exports = function lint(gulp, plugins, paths) {
  const eslint = plugins.eslint;

  return function task() {
    return gulp.src(`${paths.src.js}/**/*.js`)
      .pipe(eslint())
      .pipe(eslint.format());
  };
};
