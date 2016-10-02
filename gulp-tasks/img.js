'use strict'

module.exports = function(gulp, plugins, paths) {
    return function() {
        return gulp.src(`${paths.src.img}/**`)
            .pipe(gulp.dest(paths.dist.img));
    }
}