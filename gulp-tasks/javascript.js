module.exports = function javascript(gulp, plugins, paths, settings) {
  const jspm = plugins.jspm;
  const rename = plugins.rename;

  return function () {
    return gulp.src(`${paths.src.js}/${settings.main.src}`)
      .pipe(jspm(settings.jspm))
      .pipe(rename(settings.main.dist))
      .pipe(gulp.dest(`${paths.dist.js}/${settings.main.dist}`));
  };
};
