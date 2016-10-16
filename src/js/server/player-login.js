import m from 'mithril';

import Menu from './layout/menu';
import ServerLayout from './layout/server-layout';
import LoginForm from '../common/components/login-form';
import ServerIp from '../common/services/server-ip';

const PlayerLogin = Object.create(ServerLayout);

PlayerLogin.controller = function controller() {
  if (!ServerIp.isSet()) {
    m.route('/');

    return null;
  }

  return {
    login(credentials, error) {
      // TODO: WebSocket login

      // Always error for now
      error('Incorrect username or password');
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
              m('p.title.is-3', `Log in to ${ctrl.getIp()}`))),
          m('.level',
            m('.level-item',
              m('.box.custom-centered.custom-fixed-box', [
                m.component(LoginForm, { login: ctrl.login })
              ])))
        ]))
    ])
  ]);
};

export default PlayerLogin;
