import m from 'mithril';

import ServerIp from '../../common/services/server-ip';

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
              m('p.title.is-2', 'Successfully connected! What\'s next?')
            ])),
          m('.columns', m('.column')),
          m('.columns', [
            columnMenuChoice('Login & Play', 'If you know your way', '/server/login'),
            columnMenuChoice('Register', 'If you\'re new', '/server/register'),
            columnMenuChoice('Admin', 'If you own this place', '/server/admin'),
            m('.column.has-text-centered', [
              m('a', {
                onclick: ctrl.disconnect
              }, m('h1.heading.title.is-3', 'Disconnect')),
              m('h1.subtitle.is-5', 'If you\'ve had enough')
            ])
          ])
        ])),
      m('.hero-footer',
        m('.tabs.is-boxed.is-centered',
          m('.container',
            m('ul',
              m('li.is-active',
                m('a', m('strong', 'Scroll down for server info')))))))
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
