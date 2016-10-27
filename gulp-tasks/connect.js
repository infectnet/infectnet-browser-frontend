module.exports = function connect(gulp, plugins, paths, settings) {
  return function task() {
    plugins.connect.server(settings);
  };
};
