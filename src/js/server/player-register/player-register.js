import m from 'mithril';

import ServerIp from '../../common/services/server-ip';
import ServerLayout from '../layout/server-layout';
import Register from './register';

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
  return this.constructView(m('div', binding(ctrl), [
    m('div', m('input[required]', { name: 'username', type: 'text' })),
    m('div', m('input[required]', { name: 'email', type: 'email' })),
    m('div', m('input[required]', { name: 'token', type: 'text' })),
    m('div', m('input[required]', { name: 'password', type: 'password' })),
    m('div', m('input[required]', { name: 'passwordConfirmation', type: 'password' })),
    m('div', m('input', { type: 'submit', onclick: ctrl.submit }, 'Register'))
  ]));

  function binding(data) {
    return {
      onchange(e) {
        data[e.target.name](e.target.value);
      }
    };
  }
};

export default PlayerRegister;
