import m from 'mithril';

const ErrorList = {};

ErrorList.view = function view(ctrl, args) {
  //return m('.error-list-container', args.errors().map(toErrorBox));

  return m('.error-list-container');

  function toErrorBox(error) {
    return m('.box.error-box.custom-edgy-border', [
      m('.heading.title.is-6', `Syntax Error @ ${error.line}:${error.column}`),
      m('p', error.message)
    ]);
  }
};

export default ErrorList;
