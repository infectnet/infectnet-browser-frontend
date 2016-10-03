const paths = {
  gulpTasks: './gulp-tasks',
  src: {
    html: './src',
    js: './src/js',
    css: './src/assets/css',
    img: './src/assets/img'
  },
  dist: {
    base: './dist',
    html: './dist',
    js: './dist/js',
    css: './dist/assets/css',
    img: './dist/assets/img'
  }
};

const javascriptSettings = {
  main: {
    src: 'main.js',
    dist: 'main.bundle.js'
  },
  jspm: {
    selfExecutingBundle: true,
    inject: true,
    minify: true
  }
};

const htmlSettings = (function settings() {
  const dist = `${paths.dist.js.replace(paths.dist.base, '.')}/${javascriptSettings.main.dist}`;

  return {
    js: {
      dist,
      src: javascriptSettings.main.src
    }
  };
}());

const serverSettings = {
  root: paths.dist.base,
  port: 8080
};

module.exports = {
  paths,
  javascriptSettings,
  htmlSettings,
  serverSettings
};
