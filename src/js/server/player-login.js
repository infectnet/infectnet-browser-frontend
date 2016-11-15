import m from 'mithril';

import Menu from './layout/menu';
import LoginForm from '../common/components/login-form';
import ServerIp from '../common/services/server-ip';
import WebSocketService from '../common/services/web-socket';
import { i18n } from '../common/services/i18n';
import mx from '../common/util/mx';
import Cond from '../common/util/cond';
import Animation from '../common/util/animation';

const PlayerLogin = {};

PlayerLogin.vm = {
  init() {
    PlayerLogin.vm.registrationMessageHandle = m.prop(null);
  }
};

PlayerLogin.controller = function controller() {
  PlayerLogin.vm.init();

  if (!ServerIp.isSet()) {
    m.route('/');

    return null;
  }

  const successListener = function successListener() {
    m.route('/play');
  };

  const errorListener = function errorListener(errorCallback, message) {
    errorCallback({ code: message.arguments.code });
  };

  const onErrorListener = function onErrorListener(errorCallback) {
    errorCallback({ code: 'Could not connect to server' });
  };

  return {
    login(credentials, error) {
      WebSocketService.connect();

      WebSocketService.bindAction('OK', successListener);

      WebSocketService.bindAction('ERROR', errorListener.bind(null, error));

      WebSocketService.addEventListener('error', onErrorListener.bind(null, error));

      WebSocketService.addEventListener('open', function onOpen() {
        WebSocketService.send('AUTH', credentials);
      });
    },
    isFreshRegistration() {
      return m.route.param('freshRegistration') !== undefined;
    },
    getIp: ServerIp.retrieve
  };
};

PlayerLogin.view = function view(ctrl) {
  return m('div', [
    m('section.hero.is-fullheight', [
      m('.hero-head', m('.container', Menu)),
      m('.hero-body.custom-no-hero-center',
        m('.container', [
          m('nav.level',
            m('.level-item.has-text-centered',
              m('p.title.is-3', i18n.t('server:Log in to ip', { ip: ctrl.getIp() })))),
          m('.level',
            m('.level-item',
              m('.box.custom-centered.custom-fixed-box', [
                mx.getElement('.notification.is-success', {
                  elementProp: PlayerLogin.vm.registrationMessageHandle,
                  class: Cond(ctrl.isFreshRegistration()).ifFalse('is-hidden')
                }, [
                  m('button.delete', {
                    onclick() {
                      Animation.fadesOut(null, PlayerLogin.vm.registrationMessageHandle());
                    }
                  }),
                  m.trust(i18n.t('server:Login.Fresh registration'))
                ]),
                m.component(LoginForm, { login: ctrl.login })
              ])))
        ]))
    ])
  ]);
};

export default PlayerLogin;
