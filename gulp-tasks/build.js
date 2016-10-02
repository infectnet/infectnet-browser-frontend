'use strict'

const runSequence = require('run-sequence');

module.exports = function(gulp, plugins, paths, settings) {
    return function(callback) {
        runSequence('clean',
                    'lint',
                    ['html', 'css', 'img', 'javascript'],
                    callback);
    }
}