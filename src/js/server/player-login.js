import m from 'mithril';

import ServerRealm from './server-realm';
import LoginForm from '../shared-components/login-form';

import ServerIp from '../model/server-ip';

const PlayerLogin = Object.create(ServerRealm);

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
