module.exports = function javascript(gulp, plugins, paths, settings) {
  const jspm = plugins.jspm;
  const sourcemaps = plugins.sourcemaps;

  return function task() {
    return gulp.src(`${paths.src.js}/${settings.main.src}`)
      .pipe(sourcemaps.init())
      .pipe(jspm(settings.jspm))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(`${paths.dist.js}/`));
  };
};
