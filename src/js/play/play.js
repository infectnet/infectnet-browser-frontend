import m from 'mithril';
import ace from 'brace';
import 'brace/theme/ambiance';
import 'brace/mode/groovy';

import WebSocketService from '../common/services/web-socket';
import { i18n } from '../common/services/i18n';
import mx from '../common/util/mx';
import Cond from '../common/util/cond';

import Menu from './layout/menu';
import ErrorList from './error-list';
import InfectNet from './game/infectnet.js';

const Play = {};

Play.vm = {
  init() {
    Play.vm.errors = m.prop([]);

    let editorHeight = 250;

    Play.vm.editor = {
      height(...args) {
        if (args.length === 0) {
          return editorHeight;
        }

        editorHeight = Math.max(0, args[0]);

        if (Play.vm.editor.container()) {
          Play.vm.editor.container().style.height = editorHeight;
        }

        return editorHeight;
      },
      ace: m.prop(null),
      container: m.prop(null),
      code: m.prop('')
    };

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
  if (!WebSocketService.isOpen()) {
    m.route('/server/login');
  }

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

  const clearErrors = function clearErrors() {
    Play.vm.errors([]);
  };

  WebSocketService.bindAction('COMPILATION_RESULTS', function resultListener(data) {
    clearErrors();

    addErrors(data.arguments.errors);
  });

  return {
    uploadCode() {
      WebSocketService.send('PUT_CODE', { source: Play.vm.editor.code() });
    },
    clearErrors,
    startGame(containerElement) {
      InfectNet.play(containerElement);
    },
    configureEditor(elementId) {
      const editor = ace.edit(elementId);

      editor.setOptions({
        showPrintMargin: false
      });

      editor.setTheme('ace/theme/ambiance');

      editor.getSession().setMode('ace/mode/groovy');

      editor.on('change', function editorContentsChanged() {
        Play.vm.editor.code(Play.vm.editor.ace().getValue());
      });

      Play.vm.editor.ace(editor);
    }
  };
};

Play.view = function view(ctrl) {
  const movablePanelConfig = {
    mouseDownDrag(e) {
      e.preventDefault();

      Play.vm.move.isActive(true);

      Play.vm.move.startY(e.screenY);
    },
    mouseDownStopPropagation(e) {
      e.stopPropagation();
    },
    onmousemove(e) {
      if (Play.vm.move.isActive()) {
        e.preventDefault();

        const diff = Play.vm.move.startY() - e.screenY;

        Play.vm.move.startY(e.screenY);

        Play.vm.editor.height(Play.vm.editor.height() + diff);
      }
    },
    onmouseup(e) {
      if (Play.vm.move.isActive()) {
        e.preventDefault();

        Play.vm.move.isActive(false);
      }
    },
    documentMouseOut(e) {
      if (Play.vm.move.isActive()) {
        const from = e.relatedTarget || e.toElement;

        if (!from || from.nodeName === 'HTML') {
          Play.vm.move.isActive(false);
        }
      }
    }
  };

  const setUpDocumentHandler = function setUpDocumentHandler(element, isInitialized) {
    if (isInitialized) {
      return;
    }

    document.addEventListener('mouseout', movablePanelConfig.documentMouseOut, false);
  };

  const heightNotZero = Cond(Play.vm.editor.height() > 0);

  return m('section', {
    onmousemove: movablePanelConfig.onmousemove,
    onmouseup: movablePanelConfig.onmouseup,
    config: setUpDocumentHandler
  }, [
    m('.hero.is-fullheight.is-dark', [
      m('.hero-head', m('.container.is-marginless.is-fluid', Menu)),
      m('.hero-body.is-paddingless', m('.container.is-marginless.is-fluid', [
        m('#game-container.custom-text-centered', {
          config(element, isInitialized) {
            if (isInitialized) {
              return;
            }

            ctrl.startGame(element);
          }
        }, [
          /* Phaser's canvas will be placed here */
        ])
      ]))
    ]),
    m('.bottom-panel.container.is-marginless.is-fluid', [
      mx.getElement('nav.nav.has-shadow', {
        elementProp: Play.vm.move.bar,
        onmousedown: movablePanelConfig.mouseDownDrag
      },
        m('.container', [
          m('.nav-left', [
            m('a.nav-item.is-tab.is-active', {
              onmousedown: movablePanelConfig.mouseDownStopPropagation
            }, i18n.t('play:Menu.Code Editor')),
            m('a.nav-item.is-tab', {
              onmousedown: movablePanelConfig.mouseDownStopPropagation
            }, i18n.t('play:Menu.Live Status'))
          ]),
          m('.nav-right', [
            m('a.nav-item',
              m('span.icon',
                m('i.fa', {
                  class: heightNotZero.cond('fa-chevron-down', 'fa-chevron-up'),
                  onmousedown: movablePanelConfig.mouseDownStopPropagation,
                  onclick() {
                    if (heightNotZero.get()) {
                      Play.vm.editor.height(0);
                    } else {
                      Play.vm.editor.height(250);
                    }
                  }
                })))
          ])
        ])),
      mx.getElement('.container.is-marginless.is-fluid', {
        elementProp: Play.vm.editor.container,
        style: { height: `${Play.vm.editor.height()}px` }
      }, [
        m('div', { style: { width: '350px' } }, [
          m('a.button.is-success.is-medium.custom-max-width.custom-edgy-border', {
            onclick: ctrl.uploadCode
          }, [
            m('span.icon',
              m('i.fa.fa-code')),
            m('span', i18n.t('play:Editor.Upload Code'))
          ]),
          m('a.button.is-danger.is-medium.custom-max-width.custom-edgy-border', {
            onclick: ctrl.clearErrors
          }, [
            m('span.icon',
              m('i.fa.fa-times')),
            m('span', i18n.t('play:Editor.Clear Errors'))
          ]),
          m.component(ErrorList, { errors: Play.vm.errors })
        ]),
        mx.bindOnce(function editorProvider() {
          return m('#editor', { style: { left: '350px' }, config: ctrl.configureEditor.bind(null, 'editor') });
        })
      ])
    ])
  ]);
};

export default Play;
