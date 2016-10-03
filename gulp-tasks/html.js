module.exports = function html(gulp, plugins, paths, settings) {
  const replace = plugins.replace;

  return function task() {
    return gulp.src(`${paths.src.html}/*.html`)
      .pipe(replace('jspm_packages/system.js', settings.js.dist))
      .pipe(replace('<script src="config.js"></script>', ''))
      .pipe(replace(`<script>System.import('${paths.src.js}/${settings.js.src}');</script>`, ''))
      .pipe(gulp.dest(paths.dist.html));
  };
};
