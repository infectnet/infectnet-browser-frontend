import m from 'mithril';

import AdminLayout from './layout/admin-layout';

import LoginForm from '../../common/components/login-form';
import ServerIp from '../../common/services/server-ip';
import JwtAuth from '../../common/services/jwt-auth';

const AdminLogin = Object.create(AdminLayout);

AdminLogin.controller = function controller() {
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
