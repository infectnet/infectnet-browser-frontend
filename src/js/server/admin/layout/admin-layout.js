import m from 'mithril';

import Menu from './menu';

import ServerIp from '../../../common/services/server-ip';
import JwtAuth from '../../../common/services/jwt-auth';

const AdminRealm = {
  checkRedirect() {
    if (!ServerIp.isSet()) {
      m.route('/');

      return true;
    }

    if (!JwtAuth.isAuthenticated()) {
      m.route('/server/admin/login');

      return true;
    }

    return false;
  },
  constructView(childContent) {
    return [Menu, m('div', childContent)];
  }
};

export default AdminRealm;
