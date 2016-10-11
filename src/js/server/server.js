import ServerDashboard from './server-dashboard';
import PlayerLogin from './player-login';
import PlayerRegister from './player-register';

import AdminDashboard from './admin/admin-dashboard';
import AdminLogin from './admin/admin-login';
import TokenManagement from './admin/token-management/token-management';

const Server = {
  getRoutes() {
    return {
      '/server': ServerDashboard,
      '/server/login': PlayerLogin,
      '/server/register': PlayerRegister,
      '/server/admin': AdminDashboard,
      '/server/admin/login': AdminLogin,
      '/server/admin/tokens': TokenManagement
    };
  }
};

export default Server;
