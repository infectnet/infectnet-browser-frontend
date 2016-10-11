import m from 'mithril';

import ServerIp from '../model/server-ip';
import ServerRealm from './server-realm';

const PlayerRegister = Object.create(ServerRealm);

PlayerRegister.vm = {
  init() {
    PlayerRegister.vm.username = m.prop('');

    PlayerRegister.vm.password = m.prop('');

    PlayerRegister.vm.passwordConfirmation = m.prop('');

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
    email: PlayerRegister.vm.email,
    submit(e) {
      e.preventDefault();

      console.log('Go!');
    }
  };
};

PlayerRegister.view = function view(ctrl) {
  return m('div', binding(ctrl), [
    m('div', m('input[required]', { name: 'username', type: 'text' })),
    m('div', m('input[required]', { name: 'email', type: 'email' })),
    m('div', m('input[required]', { name: 'password', type: 'password' })),
    m('div', m('input[required]', { name: 'passwordConfirmation', type: 'password' })),
    m('div', m('input', { type: 'submit', onclick: ctrl.submit }, 'Register'))
  ]);

  function binding(data) {
    return {
      onchange(e) {
        data[e.target.name](e.target.value);
      }
    };
  }
};

export default PlayerRegister;
