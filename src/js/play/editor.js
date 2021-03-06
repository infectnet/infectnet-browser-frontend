import m from 'mithril';
import ace from 'brace';
import PubSub from 'pubsub-js';
import 'brace/theme/ambiance';
import 'brace/mode/groovy';

import mx from '../common/util/mx';

import Topics from './topics';

const Editor = {};

const DEFAULT_ELEMENT_ID = 'editor';

Editor.vm = {
  init() {
    Editor.vm.editorElement = m.prop(null);
    Editor.vm.initCode = m.prop('');
  }
};

Editor.controller = function controller(args) {
  Editor.vm.init();

  PubSub.subscribe(Topics.CODE_RETRIEVED, function codeRetrieved(msg, source) {
    Editor.vm.initCode(source);

    if (Editor.vm.editorElement()) {
      Editor.vm.editorElement().setValue(Editor.vm.initCode(), -1);
    }
  });

  PubSub.subscribe(Topics.MOUSE_MOVE, function mouseUp() {
    Editor.vm.editorElement().resize();
  });

  const configureEditor = function configureEditor(elementId) {
    const editor = ace.edit(elementId);

    editor.setOptions({
      showPrintMargin: false
    });

    args.editorConfigurator(editor);

    editor.on('change', function editorContentsChanged() {
      PubSub.publish(Topics.CODE_CHANGED, Editor.vm.editorElement().getValue());
    });

    editor.setValue(Editor.vm.initCode(), -1);

    Editor.vm.editorElement(editor);
  };

  return {
    configureEditor
  };
};

Editor.view = function view(ctrl) {
  return mx.bindOnce(function editorProvider() {
    return m(`#${DEFAULT_ELEMENT_ID}`, {
      style: { left: '350px' },
      config: ctrl.configureEditor.bind(null, DEFAULT_ELEMENT_ID)
    });
  });
};

export default Editor;
