module.exports = function javascript(gulp, plugins, paths, settings) {
  const jspm = plugins.jspm;

  return function task() {
    return gulp.src(`${paths.src.js}/${settings.main.src}`)
      .pipe(jspm(settings.jspm))
      .pipe(gulp.dest(`${paths.dist.js}/`));
  };
};
