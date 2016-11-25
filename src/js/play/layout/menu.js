import m from 'mithril';

import ServerIp from '../../common/services/server-ip';
import { i18n } from '../../common/services/i18n';

import TopMenu from '../../common/components/top-menu';
import LanguageSelector from '../../common/components/language-selector';

const Menu = {};

Menu.controller = function controller() {
  const ctrl = TopMenu.controller({ routes: [] });

  ctrl.getIp = function getIp() {
    return ServerIp.retrieve();
  };

  return ctrl;
};

Menu.view = function view(ctrl) {
  return m('nav.nav.has-shadow', [
    m('.nav-left',
      m('h1.title.nav-item', ctrl.getIp())),
    m('.nav-center',
      m('a.nav-item', {
        config: m.route, href: '/server'
      }, i18n.t('common:Menu.Quit Game'))),
    m('.nav-right.nav-menu', LanguageSelector)
  ]);
};

export default Menu;
