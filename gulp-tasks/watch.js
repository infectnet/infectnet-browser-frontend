module.exports = function watch(gulp, plugins, paths) {
  const util = plugins.util;

  const logChanges = function log(event) {
    util.log(`File ${event.path} was ${event.type}`);
  };

  return function task() {
    gulp.watch([`${paths.src.js}/**/*.js`], ['lint', 'javascript']).on('change', logChanges);
    gulp.watch([`${paths.src.sass}/**/*.sass`], ['sass']).on('change', logChanges);
    gulp.watch([`${paths.src.html}/*.html`], ['html']).on('change', logChanges);
    gulp.watch([`${paths.src.locales}/**/*.json`], ['locales']).on('change', logChanges);
  };
};
