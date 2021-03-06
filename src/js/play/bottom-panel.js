import m from 'mithril';
import PubSub from 'pubsub-js';

import { i18n } from '../common/services/i18n';
import mx from '../common/util/mx';
import Cond from '../common/util/cond';

import InfectNet from './game/infectnet';
import EditorTab from './editor-tab';
import LiveTab from './live-tab';
import Topics from './topics';

const BottomPanel = {};

const DEFAULT_INNER_HEIGHT = 250;

const Tabs = {
  EDITOR: 'editor',
  LIVE: 'live'
};

BottomPanel.vm = {
  init() {
    BottomPanel.vm.moveBar = m.prop(null);

    BottomPanel.vm.isMoving = m.prop(null);

    BottomPanel.vm.moveStartY = m.prop(null);

    BottomPanel.vm.tabHeight = (function heightIIFE() {
      let currentHeight = DEFAULT_INNER_HEIGHT;

      return function tabHeight(...args) {
        if (args.length === 0) {
          return currentHeight;
        }

        currentHeight = Math.max(0, args[0]);

        if (BottomPanel.vm.innerContainer()) {
          BottomPanel.vm.innerContainer().style.height = currentHeight;
        }

        return currentHeight;
      };
    }());

    BottomPanel.vm.innerContainer = m.prop(null);
  }
};

BottomPanel.controller = function controller(args) {
  BottomPanel.vm.init();

  const mouseMoveSubscriber = function mouseMoveSubscriber(msg, e) {
    if (BottomPanel.vm.isMoving()) {
      e.preventDefault();

      const diff = BottomPanel.vm.moveStartY() - e.screenY;

      BottomPanel.vm.moveStartY(e.screenY);

      BottomPanel.vm.tabHeight(BottomPanel.vm.tabHeight() + diff);
    }
  };

  const mouseUpSubscriber = function mouseUpSubscriber(msg, e) {
    if (BottomPanel.vm.isMoving()) {
      e.preventDefault();

      BottomPanel.vm.isMoving(false);
    }
  };

  PubSub.subscribe(Topics.MOUSE_MOVE, mouseMoveSubscriber);
  PubSub.subscribe(Topics.MOUSE_UP, mouseUpSubscriber);

  const eventConfig = {
    mouseDownDrag(e) {
      e.preventDefault();

      BottomPanel.vm.isMoving(true);

      BottomPanel.vm.moveStartY(e.screenY);
    },
    mouseDownStopPropagation(e) {
      e.stopPropagation();
    },
    documentMouseOut(e) {
      if (BottomPanel.vm.isMoving()) {
        const from = e.relatedTarget || e.toElement;

        if (!from || from.nodeName === 'HTML') {
          BottomPanel.vm.isMoving(false);
        }
      }
    }
  };

  const tab = m.prop(Tabs.EDITOR);

  return {
    eventConfig,
    editorConfigurator: args.editorConfigurator,
    zoomIn: InfectNet.increaseZoom,
    zoomOut: InfectNet.decreaseZoom,
    jumpToBase: InfectNet.jumpToClosestBase,
    tab
  };
};

BottomPanel.view = function view(ctrl) {
  const heightNotZero = Cond(BottomPanel.vm.tabHeight() > 0);

  return m('.bottom-panel.container.is-marginless.is-fluid', {
    config(element, isInit) {
      if (!isInit) {
        document.addEventListener('mouseout', ctrl.eventConfig.documentMouseOut, false);
      }
    }
  }, [
    mx.getElement('nav.nav.has-shadow', {
      elementProp: BottomPanel.moveBar,
      onmousedown: ctrl.eventConfig.mouseDownDrag
    },
      m('.container', [
        m('.nav-left', [
          m('a.nav-item.is-tab', {
            class: Cond(ctrl.tab() === Tabs.EDITOR).ifTrue('is-active'),
            onmousedown: ctrl.eventConfig.mouseDownStopPropagation,
            onclick() { ctrl.tab(Tabs.EDITOR); }
          }, i18n.t('play:Menu.Code Editor')),
          m('a.nav-item.is-tab', {
            class: Cond(ctrl.tab() === Tabs.LIVE).ifTrue('is-active'),
            onmousedown: ctrl.eventConfig.mouseDownStopPropagation,
            onclick() { ctrl.tab(Tabs.LIVE); }
          }, i18n.t('play:Menu.Live Status'))
        ]),
        m('.nav-right', [
          m('.game-controls', {
            onmousedown: ctrl.eventConfig.mouseDownStopPropagation,
          }, [
            m('a.nav-item', { onclick: ctrl.zoomOut }, mx.icon('fa-minus')),
            m('a.nav-item', { onclick: ctrl.zoomIn }, mx.icon('fa-plus')),
            m('a.nav-item', { onclick: ctrl.jumpToBase }, mx.icon('fa-crosshairs')),
          ]),
          m('a.nav-item', {
            onmousedown: ctrl.eventConfig.mouseDownStopPropagation,
            onclick() {
              if (heightNotZero.get()) {
                BottomPanel.vm.tabHeight(0);
              } else {
                BottomPanel.vm.tabHeight(DEFAULT_INNER_HEIGHT);
              }
            }
          }, mx.icon('', { class: heightNotZero.cond('fa-chevron-down', 'fa-chevron-up') }))
        ])
      ])),
    m('div', {
      class: Cond(ctrl.tab() === Tabs.EDITOR).ifFalse('is-hidden')
    }, m.component(EditorTab, {
      editorConfigurator: ctrl.editorConfigurator,
      tabHeight: BottomPanel.vm.tabHeight
    })),
    m('div', {
      class: Cond(ctrl.tab() === Tabs.LIVE).ifFalse('is-hidden')
    }, m.component(LiveTab, {
      tabHeight: BottomPanel.vm.tabHeight
    }))
  ]);
};

export default BottomPanel;

