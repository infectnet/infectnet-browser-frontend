import m from 'mithril';
import ace from 'brace';

import mx from '../common/util/mx';

const Editor = {};

const DEFAULT_ELEMENT_ID = 'editor';

Editor.vm = {
  init() {
    Editor.vm.editorElement = m.prop(null);
    Editor.vm.code = m.prop('');
  }
};

Editor.controller = function controller(args) {
  Editor.vm.init();

  const configureEditor = function configureEditor(elementId) {
    const editor = ace.edit(elementId);

    editor.setOptions({
      showPrintMargin: false
    });

    args.editorConfigurator(editor);

    editor.on('change', function editorContentsChanged() {
      Editor.vm.code(Editor.vm.editorElement().getValue());
    });

    Editor.vm.editorElement(editor);
  };

  return {
    configureEditor
  };
};

Editor.view = function view(ctrl) {
  return mx.bindOnce(function editorProvider() {
    return m(`#${DEFAULT_ELEMENT_ID}`, { style: { left: '350px' }, config: ctrl.configureEditor.bind(null, DEFAULT_ELEMENT_ID) });
  });
};

export default Editor;
