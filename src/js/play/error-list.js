import m from 'mithril';

const ErrorList = {};

ErrorList.controller = function controller(args) {
  return {
    errors: args.errors
  };
};

ErrorList.view = function view(ctrl) {
  return m('.error-list-container', ctrl.errors.map(toErrorBox));

  function toErrorBox(error) {
    return m('.box.error-box.custom-edgy-border', [
      m('.heading.title.is-6', `${error.type} @ ${error.line}:${error.column}`),
      m('p', error.text)
    ]);
  }
};

export default ErrorList;
