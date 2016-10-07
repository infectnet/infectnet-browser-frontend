import m from 'mithril';
import Routes from './routes';

import Home from './site/home';

import ServerDashboard from './server/server-dashboard';

Routes.addRoutes({
  '/': Home
});

Routes.addRoutes({
  '/server': ServerDashboard
});

m.route.mode = 'hash';

m.route(document.body, '/', Routes.getRoutes());
