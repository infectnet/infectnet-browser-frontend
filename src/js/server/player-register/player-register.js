import m from 'mithril';

import ServerIp from '../../common/services/server-ip';
import Menu from '../layout/menu';
import { i18n } from '../../common/services/i18n';

// eslint-disable-next-line no-unused-vars
import Register from './register';
import RegisterForm from './register-form';

const PlayerRegister = {};

PlayerRegister.controller = function controller() {
  if (!ServerIp.isSet()) {
    m.route('/');

    return null;
  }

  return {
    register(userData, error) {
      error('Always error for now.');

      /* Register.register(userData).then(function success() {
        m.route('/server/login?freshRegistration');
      }, function err(message) {
        error(message);
      }); */
    }
  };
};

PlayerRegister.view = function view(ctrl) {
  return m('div', [
    m('section.hero',
      m('.hero-head', m('.container', Menu))),
    m('section.section',
      m('.container', [
        m('.heading', [
          m('p.title', i18n.t('server:Registration.Registration')),
          m('p.subtitle', i18n.t('server:Registration.Prepare for trouble!'))
        ]),
        m('hr'),
        m('.columns', [
          m('.column.is-offset-2.is-4',
            m.component(RegisterForm, { register: ctrl.register })),
          m('.column.is-offset-1.is-3',
            m('.container', [
              m('p.title.is-4', i18n.t('server:Registration.Register? Again?')),
              m('p.content',
                m.trust(i18n.t('server:Registration.Why register again')))
            ]))
        ])
      ]))
  ]);
};

export default PlayerRegister;
