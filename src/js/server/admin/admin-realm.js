import m from 'mithril';

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
    return [m('div', childContent)];
  }
};

export default AdminRealm;
