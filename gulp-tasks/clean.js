const del = require('del');

module.exports = function clean(gulp, plugins, paths) {
  return function () {
    return del(`${paths.dist.base}/**`);
  };
};
