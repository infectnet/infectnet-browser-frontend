import m from 'mithril';

import AdminMenu from './admin-menu';

import ServerIp from '../../model/server-ip';
import JwtAuth from '../../model/jwt-auth';

const AdminRealm = {
  checkRedirect() {
    if (!ServerIp.isSet()) {
      m.route('/');
    }

    if (!JwtAuth.isAuthenticated()) {
      m.route('/server/admin/login');
    }
  },
  constructView(childContent) {
    return [AdminMenu, m('div', childContent)];
  }
};

export default AdminRealm;
