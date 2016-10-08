import m from 'mithril';

import AdminRealm from './admin-realm';
import LoginForm from '../../shared-components/login-form';

const AdminLogin = Object.create(AdminRealm);

AdminLogin.controller = function controller() {
  return {
    validateCredentials(username) {
      if (username.length < 8) {
        return {
          isValid: false,
          errorMessage: 'The username is too short'
        };
      }

      return {
        isValid: true,
        errorMessage: ''
      };
    }
  };
};

AdminLogin.view = function view(ctrl) {
  return this.constructView(m.component(LoginForm, { validate: ctrl.validateCredentials }));
};

export default AdminLogin;
