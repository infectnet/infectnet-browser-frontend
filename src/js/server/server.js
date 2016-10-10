import ServerDashboard from './server-dashboard';
import PlayerLogin from './player-login';

import AdminDashboard from './admin/admin-dashboard';
import AdminLogin from './admin/admin-login';
import TokenManagement from './admin/token-management/token-management';

const Server = {
  getRoutes() {
    return {
      '/server': ServerDashboard,
      '/server/login': PlayerLogin,
      '/server/admin': AdminDashboard,
      '/server/admin/login': AdminLogin,
      '/server/admin/tokens': TokenManagement
    };
  }
};

export default Server;
