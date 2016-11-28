import m from 'mithril';

import { i18n } from '../common/services/i18n';
import mx from '../common/util/mx';

import ErrorList from './error-list';
import Editor from './editor';

const EditorTab = {};

EditorTab.vm = {
  init() {

  }
};

EditorTab.controller = function controller(args) {
  return {
    editorConfigurator: args.editorConfigurator,
    tabHeight: args.tabHeight
  };
};

EditorTab.view = function view(ctrl) {
  return m('.container.is-marginless.is-fluid', {
    style: { height: `${ctrl.tabHeight()}px` }
  }, [
    m('div', { style: { width: '350px' } }, [
      m('a.button.is-success.is-medium.custom-max-width.custom-edgy-border', {
        onclick: ctrl.uploadCode
      }, [
        mx.icon('fa-code'),
        m('span', i18n.t('play:Editor.Upload Code'))
      ]),
      m('a.button.is-danger.is-medium.custom-max-width.custom-edgy-border', {
        onclick: ctrl.clearErrors
      }, [
        mx.icon('fa-times'),
        m('span', i18n.t('play:Editor.Clear Errors'))
      ]),
      ErrorList
    ]),
    m.component(Editor, { editorConfigurator: ctrl.editorConfigurator })
  ]);
};

export default EditorTab;
