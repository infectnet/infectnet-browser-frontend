const runSequence = require('run-sequence');

module.exports = function build() {
  return function (callback) {
    runSequence('clean',
      'lint',
      ['html', 'css', 'img', 'javascript'],
      callback);
  };
};
