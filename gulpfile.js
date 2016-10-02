const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

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

const getTask = function getTask(task, extraArgs = {}) {
  // eslint-disable-next-line global-require
  return require(`${paths.gulpTasks}/${task}`)(gulp, plugins, paths, extraArgs);
};

gulp.task('clean', getTask('clean'));
gulp.task('lint', getTask('lint'));
gulp.task('css', getTask('css'));
gulp.task('html', getTask('html', htmlSettings));
gulp.task('img', getTask('img'));
gulp.task('javascript', getTask('javascript', javascriptSettings));

gulp.task('watch', ['lint', 'javascript', 'css', 'html'], getTask('watch'));

gulp.task('build', getTask('build'));

gulp.task('connect', ['build'], getTask('connect', serverSettings));

gulp.task('default', ['connect', 'watch']);
