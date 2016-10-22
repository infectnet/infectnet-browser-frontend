import m from 'mithril';

import ServerIp from '../../common/services/server-ip';
import { i18n } from '../../common/services/i18n';

import Menu from '../layout/menu';

import ServerInfo from './server-info';

const ServerDashboard = {};

ServerDashboard.controller = function controller() {
  if (!ServerIp.isSet()) {
    m.route('/');

    return null;
  }

  return {
    getIp() {
      return ServerIp.retrieve();
    },
    disconnect(e) {
      e.preventDefault();

      ServerIp.discard();

      m.route('/');
    }
  };
};

ServerDashboard.view = function view(ctrl) {
  return m('div', [
    m('section.hero.is-dark.is-fullheight', [
      m('.hero-head',
        m('.container', Menu)),
      m('.hero-body',
        m('.container.is-vcentered', [
          m('.columns',
            m('.column.has-text-centered', [
              m('p.title.is-2', i18n.t('server:Dashboard.Successfully connected'))
            ])),
          m('.columns', m('.column')),
          m('.columns', [
            columnMenuChoice(i18n.t('server:Dashboard.Login & Play'), i18n.t('server:Dashboard.Login Info'), '/server/login'),
            columnMenuChoice(i18n.t('server:Dashboard.Register'), i18n.t('server:Dashboard.Register Info'), '/server/register'),
            columnMenuChoice(i18n.t('server:Dashboard.Admin'), i18n.t('server:Dashboard.Admin Info'), '/server/admin'),
            m('.column.has-text-centered', [
              m('a', {
                onclick: ctrl.disconnect
              }, m('h1.heading.title.is-3', i18n.t('server:Dashboard.Disconnect'))),
              m('h1.subtitle.is-5', i18n.t('server:Dashboard.Disconnect Info'))
            ])
          ])
        ])),
      m('.hero-footer',
        m('.tabs.is-boxed.is-centered',
          m('.container',
            m('ul',
              m('li.is-active',
                m('a', m('strong', i18n.t('server:Dashboard.Scroll down for server info'))))))))
    ]),
    ServerInfo
  ]);

  function columnMenuChoice(title, subtitle, link) {
    return m('.column.has-text-centered', [
      m('a', { config: m.route, href: link },
        m('h1.heading.title.is-3', title)),
      m('h1.subtitle.is-5', subtitle)
    ]);
  }
};

export default ServerDashboard;
