import m from 'mithril';

import ServerIp from '../../../common/services/server-ip';
import JwtAuth from '../../../common/services/jwt-auth';

const AdminLayout = {
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
  }
};

export default AdminLayout;
