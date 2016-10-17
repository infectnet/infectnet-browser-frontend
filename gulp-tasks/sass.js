module.exports = function sassTask(gulp, plugins, paths) {
  const sass = plugins.sass;
  const sourcemaps = plugins.sourcemaps;

  return function task() {
    return gulp.src(`${paths.src.sass}/**/*.sass`)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.dist.css));
  };
};
