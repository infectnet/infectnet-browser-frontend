import m from 'mithril';

import AdminRealm from './admin-realm';
import LoginForm from '../../common/login-form';

import ServerIp from '../../model/server-ip';
import JwtAuth from '../../model/jwt-auth';

const AdminLogin = Object.create(AdminRealm);

AdminLogin.controller = function controller() {
  if (!ServerIp.isSet()) {
    m.route('/');
  }

  return {
    validateCredentials() {
      return {
        isValid: true,
        errorMessage: ''
      };
    },
    login(credentials) {
      JwtAuth.login(credentials).then(function redirect() {
        m.route('/server/admin/');
      });
    }
  };
};

AdminLogin.view = function view(ctrl) {
  return this.constructView(m.component(LoginForm, {
    validate: ctrl.validateCredentials, login: ctrl.login
  }));
};

export default AdminLogin;
