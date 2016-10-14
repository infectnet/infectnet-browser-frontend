import m from 'mithril';

import ServerLayout from './layout/server-layout';
import LoginForm from '../common/login-form';

import ServerIp from '../model/server-ip';

const PlayerLogin = Object.create(ServerLayout);

PlayerLogin.controller = function controller() {
  if (!ServerIp.isSet()) {
    m.route('/');

    return null;
  }

  return {
    validateCredentials() {
      return {
        isValid: true,
        errorMessage: ''
      };
    },
    login() {
      // TODO: WebSocket login
    }
  };
};

PlayerLogin.view = function view(ctrl) {
  return this.constructView(m.component(LoginForm, {
    validate: ctrl.validateCredentials, login: ctrl.login
  }));
};

export default PlayerLogin;
