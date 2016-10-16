import m from 'mithril';

import ServerIp from '../../common/services/server-ip';
import ServerLayout from '../layout/server-layout';
import Menu from '../layout/menu';

import Register from './register';
import RegisterForm from './register-form';

const PlayerRegister = Object.create(ServerLayout);

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
          m('p.title', 'Registration'),
          m('p.subtitle', 'Prepare for trouble!')
        ]),
        m('hr'),
        m('.columns', [
          m('.column.is-offset-2.is-4',
            m.component(RegisterForm, { register: ctrl.register })),
          m('.column.is-offset-1.is-3',
            m('.container', [
              m('p.title.is-4', 'Register? Again?'),
              m('p.content',
                m.trust(`<p>You have to create separate accounts on each server you visit.
                         This is required because we do not have a central user database,
                         but each server has its own.</p>
                         <p>So even if you've already registered somewhere else, you cannot use
                         your account here - because servers do not share data.</p>
                         <p>The easiest (and best) way to solve this problem is to use the same credentials
                         on this server too.</p>`))
            ]))
        ])
      ]))
  ]);
};

export default PlayerRegister;
