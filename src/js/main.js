import m from 'mithril';
import Routes from './routes';

import Home from './site/home';

import ServerDashboard from './server/server-dashboard';

import Play from './play/play';

Routes.addRoutes({
  '/': Home
});

Routes.addRoutes({
  '/server': ServerDashboard
});

Routes.addRoutes({
  '/play': Play
});

m.route.mode = 'hash';

m.route(document.body, '/', Routes.getRoutes());
