'use strict'

module.exports = function(gulp, plugins, paths, settings) {
    const util = plugins.util;

    const logChanges = function(event) {
        util.log(`File ${event.path} was ${event.type}`);
    };

    return function() {
        gulp.watch([`${paths.src.javascript}/**/*.js`], ['lint', 'javascript']).on('change', logChanges);
        gulp.watch([`${paths.src.css}/*.css`], ['css']).on('change', logChanges);
        gulp.watch([`${paths.src.html}/*.html`], ['html']).on('change', logChanges);
    }
}