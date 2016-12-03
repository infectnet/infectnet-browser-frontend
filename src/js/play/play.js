import m from 'mithril';
import PubSub from 'pubsub-js';

import WebSocketService from '../common/services/web-socket';

import Menu from './layout/menu';
import InfectNet from './game/infectnet';
import BottomPanel from './bottom-panel';
import Topics from './topics';
import ServerCommunicator from './server-communicator';

const CLIENT_SIZE_FACTOR = 0.8;

const Play = {};

Play.vm = {
  init() {
    Play.vm.errors = m.prop([]);
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

  ServerCommunicator.initialize();

  /*
   *  Don't even ask, why this is here...
   */
  const editorConfigurator = function editorConfigurator(editor) {
    editor.setTheme('ace/theme/ambiance');

    editor.getSession().setMode('ace/mode/groovy');
  };

  const eventConfig = {
    onmousemove(e) {
      PubSub.publish(Topics.MOUSE_MOVE, e);
    },
    onmouseup(e) {
      PubSub.publish(Topics.MOUSE_UP, e);
    }
  };

  const calculateGameRect = function calculateGameRect(gameBodyElement) {
    const rect = {};

    rect.height = CLIENT_SIZE_FACTOR * gameBodyElement.clientHeight;
    rect.width = (rect.height / 3.0) * 4.0;

    return rect;
  };

  return {
    startGame(containerElement, gameBodyElement) {
      InfectNet.play(containerElement,
                     calculateGameRect(gameBodyElement),
                     ServerCommunicator.subscribe);

      ServerCommunicator.getCode();
    },
    editorConfigurator,
    eventConfig
  };
};

Play.view = function view(ctrl) {
  return m('section', {
    onmousemove: ctrl.eventConfig.onmousemove,
    onmouseup: ctrl.eventConfig.onmouseup,
  }, [
    m('.hero.is-fullheight.is-dark', [
      m('.hero-head', m('.container.is-marginless.is-fluid', Menu)),
      m('.hero-body.is-paddingless',
        m('.container.is-marginless.is-fluid', [
          m('#game-container.custom-text-centered', {
            config(element, isInitialized) {
              if (!isInitialized) {
                ctrl.startGame(element, document.querySelector('.hero-body'));
              }
            }
          })
        ]))
    ]),
    m.component(BottomPanel, { editorConfigurator: ctrl.editorConfigurator })
  ]);
};

export default Play;
