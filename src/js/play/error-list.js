import m from 'mithril';
import PubSub from 'pubsub-js';

import Topics from './topics';

const ErrorList = {};

ErrorList.vm = {
  init() {
    ErrorList.vm.errors = m.prop([]);
  }
};

ErrorList.controller = function controller() {
  ErrorList.vm.init();

  const clearErrors = function clearErrors() {
    ErrorList.vm.errors([]);
  };

  const errorProcessor = function errorProcessor(msg, results) {
    clearErrors();

    results.errors.forEach(function populateErrors(error) {
      ErrorList.vm.errors().unshift(error);
    });
  };

  PubSub.subscribe(Topics.COMPILATION_RESULTS, errorProcessor);
  PubSub.subscribe(Topics.CLEAR_ERRORS, clearErrors);
};

ErrorList.view = function view() {
  return m('.error-list-container', ErrorList.vm.errors().map(toErrorBox));

  function toErrorBox(error) {
    return m('.box.error-box.custom-edgy-border', [
      m('.heading.title.is-6', `Syntax Error @ ${error.line}:${error.column}`),
      m('p', error.message)
    ]);
  }
};

export default ErrorList;
