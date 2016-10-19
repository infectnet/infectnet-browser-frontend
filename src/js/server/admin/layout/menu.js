import m from 'mithril';

import ServerIp from '../../../common/services/server-ip';
import { i18n } from '../../../common/services/i18n';

import TopMenu from '../../../common/components/top-menu';

const routes = [
  {
    name: 'Dashboard',
    path: '/server/admin'
  },
  {
    name: 'Manage Tokens',
    path: '/server/admin/tokens'
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
      m('a.nav-item', { config: m.route, href: '/server/admin' },
        m('h1.title', `${i18n.t('admin:Admin')} @ ${ctrl.getIp()}`))),
    m('.nav-center',
      m('a.nav-item', {
        config: m.route, href: '/server'
      }, i18n.t('common:Menu.Back to Server'))),
    m('.nav-right.nav-menu', ctrl.routes.map(routeToOption))
  ]);

  function routeToOption(route) {
    const anchorClass = ctrl.isSelected(route.path) ? 'is-active' : '';

    return m('a.nav-item', {
      config: m.route, href: route.path, class: anchorClass
    }, i18n.t(`common:Menu.${route.name}`));
  }
};

export default Menu;
