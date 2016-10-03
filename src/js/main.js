import m from 'mithril';

import Home from './home';

m.route.mode = 'hash';

m.route(document.body, '/', {
  '/': Home
});
