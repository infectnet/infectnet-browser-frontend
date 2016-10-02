const del = require('del');

module.exports = function clean(gulp, plugins, paths) {
  return function () {
    del.sync(`${paths.dist.base}/**`);
  };
};
