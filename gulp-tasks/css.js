'use strict'

module.exports = function(gulp, plugins, paths) {
    return function() {
        return gulp.src(`${paths.src.css}/*.css`)
            .pipe(gulp.dest(paths.dist.css));
    }
}