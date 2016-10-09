import m from 'mithril';
import Routes from './routes';

import Site from './site/site.js';
import Server from './server/server.js';
import Play from './play/play';

Routes.addRoutes(Site.getRoutes());

Routes.addRoutes(Server.getRoutes());

Routes.addRoutes(Play.getRoutes());

m.route.mode = 'hash';

m.route(document.body, '/', Routes.getRoutes());
