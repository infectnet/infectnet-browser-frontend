const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

const config = require('./gulp-config');

const getTask = function getTask(task, extraArgs = {}) {
  // eslint-disable-next-line global-require
  return require(`${config.paths.gulpTasks}/${task}`)(gulp, plugins, config.paths, extraArgs);
};

gulp.task('clean', getTask('clean'));
gulp.task('lint', getTask('lint'));
gulp.task('sass', getTask('sass'));
gulp.task('html', getTask('html', config.htmlSettings));
gulp.task('img', getTask('img'));
gulp.task('javascript', getTask('javascript', config.javascriptSettings));

gulp.task('watch', ['lint', 'javascript', 'sass', 'html'], getTask('watch'));

gulp.task('build', getTask('build'));

gulp.task('connect', ['build'], getTask('connect', config.serverSettings));

gulp.task('default', ['connect', 'watch']);
