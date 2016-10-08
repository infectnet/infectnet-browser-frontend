import m from 'mithril';
import Routes from './routes';

import Home from './site/home';
import About from './site/about';

import ServerDashboard from './server/server-dashboard';
import AdminLogin from './server/admin/admin-login';

import Play from './play/play';

Routes.addRoutes({
  '/': Home,
  '/about': About
});

Routes.addRoutes({
  '/server': ServerDashboard,
  '/server/admin/login': AdminLogin
});

Routes.addRoutes({
  '/play': Play
});

m.route.mode = 'hash';

m.route(document.body, '/', Routes.getRoutes());
