module.exports = function connect(gulp, plugins, paths, settings) {
  return function () {
    plugins.connect.server(settings);
  };
};
