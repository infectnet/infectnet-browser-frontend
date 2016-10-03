const runSequence = require('run-sequence');

module.exports = function build() {
  return function task(callback) {
    runSequence('clean',
      'lint',
      ['html', 'css', 'img', 'javascript'],
      callback);
  };
};
