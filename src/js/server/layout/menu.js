import m from 'mithril';

import ServerIp from '../../common/services/server-ip';

import TopMenu from '../../common/components/top-menu';

const routes = [
  {
    name: 'Login',
    path: '/server/login'
  },
  {
    name: 'Register',
    path: '/server/register'
  },
  {
    name: 'Admin Dashboard',
    path: '/server/admin'
  }
];

const Menu = {};

Menu.controller = function controller() {
  const ctrl = TopMenu.controller({ routes });

  ctrl.getIp = function getIp() {
    return ServerIp.retrieve();
  };

  return ctrl;
};

Menu.view = function view(ctrl) {
  return m('nav.nav.has-shadow', [
    m('.nav-left',
      m('a.nav-item', { config: m.route, href: '/server' },
        m('h1.title', ctrl.getIp()))),
    m('.nav-center',
      m('a.nav-item', {
        config: m.route, href: '/'
      }, 'Back to Home')),
    m('.nav-right.nav-menu', ctrl.routes.map(routeToOption))
  ]);

  function routeToOption(route) {
    const anchorClass = ctrl.isSelected(route.path) ? 'is-active' : '';

    return m('a.nav-item', {
      config: m.route, href: route.path, class: anchorClass
    }, route.name);
  }
};

export default Menu;
