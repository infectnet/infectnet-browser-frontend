'use strict'

module.exports = function(gulp, plugins, paths, settings) {
    const connect = plugins.connect;

    return function() {
        connect.server(settings);
    }
}