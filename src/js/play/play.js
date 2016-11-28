import m from 'mithril';
import 'brace/theme/chaos';
import 'brace/mode/groovy';

import WebSocketService from '../common/services/web-socket';

import Menu from './layout/menu';
import InfectNet from './game/infectnet';
import BottomPanel from './bottom-panel';

const Play = {};

Play.vm = {
  init() {
    Play.vm.errors = m.prop([]);

    Play.vm.move = {
      isActive: m.prop(false),
      startY: m.prop(0),
      bar: m.prop(null)
    };
  }
};

Play.getRoutes = function getRoutes() {
  return {
    '/play': Play
  };
};

Play.controller = function controller() {
  /*if (!WebSocketService.isOpen()) {
    m.route('/server/login');
  }*/

  Play.vm.init();

  const addErrors = function addErrors(errorArray) {
    errorArray.map(function convertError(error) {
      return {
        message: error.message,
        line: error.lineNumber,
        column: error.columnNumber
      };
    }).forEach(function populateErrors(error) {
      Play.vm.errors().unshift(error);
    });
  };

  /*
   *  Don't even ask, why this is here...
   */
  const editorConfigurator = function editorConfigurator(editor) {
    editor.setTheme('ace/theme/chaos');

    editor.getSession().setMode('ace/mode/groovy');
  };

  const clearErrors = function clearErrors() {
    Play.vm.errors([]);
  };

  /*WebSocketService.bindAction('COMPILATION_RESULTS', function resultListener(data) {
    clearErrors();

    addErrors(data.arguments.errors);
  });*/

  return {
    uploadCode() {
      WebSocketService.send('PUT_CODE', { source: Play.vm.editor.code() });
    },
    clearErrors,
    startGame(containerElement) {
      InfectNet.play(containerElement);
    },
    editorConfigurator
  };
};

Play.view = function view(ctrl) {
  return m('section', [
    m('.hero.is-fullheight.is-dark', [
      m('.hero-head', m('.container.is-marginless.is-fluid', Menu)),
      m('.hero-body.is-paddingless', m('.container.is-marginless.is-fluid', [
        m('#game-container.custom-text-centered', {
          config(element, isInitialized) {
            if (!isInitialized) {
              ctrl.startGame(element);
            }
          }
        })
      ]))
    ]),
    m.component(BottomPanel, { editorConfigurator: ctrl.editorConfigurator })
  ]);
};

export default Play;
