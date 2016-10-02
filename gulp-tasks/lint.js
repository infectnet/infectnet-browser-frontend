'use strict'

module.exports = function(gulp, plugins, paths) {
    const eslint = plugins.eslint;

    return function() {
        return gulp.src(`${paths.src.javascript}/**/*.js`)
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    }
}