'use strict'

module.exports = function(gulp, plugins, paths, settings) {
    const jspm = plugins.jspm;
    const rename = plugins.rename;

    return function() {
        return gulp.src(`${paths.src.javascript}/${settings.main.src}`)
            .pipe(jspm(settings.jspm))
            .pipe(rename(settings.main.dist))
            .pipe(gulp.dest(`${paths.dist.js}/${settings.main.dist}`));
    }
}