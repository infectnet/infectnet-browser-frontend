import m from 'mithril';
import ace from 'brace';

import Routes from './routes';

import Site from './site/site.js';
import Server from './server/server.js';
import Play from './play/play';

import { initInternationalization } from './common/services/i18n';

Routes.addRoutes(Site.getRoutes());

Routes.addRoutes(Server.getRoutes());

Routes.addRoutes(Play.getRoutes());

m.route.mode = 'hash';

initInternationalization(function run() {
  m.route(document.body, '/', Routes.getRoutes());
});
