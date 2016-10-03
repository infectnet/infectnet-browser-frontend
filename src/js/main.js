import m from 'mithril';

import Home from './home';
import ServerDashboard from './server-dashboard';

m.route.mode = 'hash';

m.route(document.body, '/', {
  '/': Home,
  '/server': ServerDashboard
});
