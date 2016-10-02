'use strict'

const del = require('del');

module.exports = function(gulp, plugins, paths) {
    return function() {
        return del(`${paths.dist.base}/**`);
    }
}