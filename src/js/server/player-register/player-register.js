import m from 'mithril';

import ServerIp from '../../common/services/server-ip';
import ServerLayout from '../layout/server-layout';
import Menu from '../layout/menu';

import Register from './register';
import RegisterForm from './register-form';

const PlayerRegister = Object.create(ServerLayout);

PlayerRegister.vm = {
  init() {
    PlayerRegister.vm.username = m.prop('');

    PlayerRegister.vm.password = m.prop('');

    PlayerRegister.vm.passwordConfirmation = m.prop('');

    PlayerRegister.vm.token = m.prop('');

    PlayerRegister.vm.email = m.prop('');
  }
};

PlayerRegister.controller = function controller() {
  if (!ServerIp.isSet()) {
    m.route('/');

    return null;
  }

  PlayerRegister.vm.init();

  return {
    username: PlayerRegister.vm.username,
    password: PlayerRegister.vm.password,
    passwordConfirmation: PlayerRegister.vm.passwordConfirmation,
    token: PlayerRegister.vm.token,
    email: PlayerRegister.vm.email,
    submit(e) {
      e.preventDefault();

      const userData = {
        username: PlayerRegister.vm.username,
        password: PlayerRegister.vm.password,
        token: PlayerRegister.vm.token,
        email: PlayerRegister.vm.email,
      };

      Register.register(userData).then(function success() {
        m.route('/server/login?freshRegistration');
      }, function error() {
        // report error
      });
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
          m('.column.is-offset-2.is-4', RegisterForm),
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
