import m from 'mithril';

import Menu from './layout/menu';

import LoginForm from '../../common/components/login-form';
import ServerIp from '../../common/services/server-ip';
import JwtAuth from '../../common/services/jwt-auth';

import { i18n } from '../../common/services/i18n';

const AdminLogin = {};

AdminLogin.controller = function controller() {
  if (!ServerIp.isSet()) {
    m.route('/');

    return null;
  }

  return {
    login(credentials, error) {
      JwtAuth.login(credentials).then(function redirect() {
        m.route('/server/admin/');
      }, error);
    },
    getIp: ServerIp.retrieve
  };
};

AdminLogin.view = function view(ctrl) {
  return m('div', [
    m('section.hero.is-fullheight', [
      m('.hero-head', m('.container', Menu)),
      m('.hero-body.custom-no-hero-center',
        m('.container', [
          m('nav.level',
            m('.level-item.has-text-centered',
              m('p.title.is-3', i18n.t('admin:Login.Admin log in to ip', { ip: ctrl.getIp() })))),
          m('.level',
            m('.level-item',
              m('.box.custom-centered.custom-fixed-box', [
                m.component(LoginForm, { login: ctrl.login })
              ])))
        ]))
    ])
  ]);
};

export default AdminLogin;
