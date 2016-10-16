import m from 'mithril';

import Menu from '../layout/menu';
import AdminLayout from '../layout/admin-layout';

import { TokenService } from './token.js';

import TokenList from './token-list';

const TokenManagement = Object.create(AdminLayout);

TokenManagement.controller = function controller() {
  if (TokenManagement.checkRedirect()) {
    return;
  }

  this.tokens = TokenService.list();

  this.request = function request() {
    TokenService.requestNew().then(controller.bind(this));
  }.bind(this);
};

TokenManagement.view = function view(ctrl) {
  return m('div', [
    m('section.hero',
      m('.hero-head', m('.container', Menu))),
    m('section.section',
      m('.container', [
        m('.heading', [
          m('p.title', 'Token Management'),
          m('p.subtitle', 'Invite people to play on your server')
        ]),
        m('hr'),
        m('.columns', [
          m('.column.is-offset-1.is-5', [
            m.component(TokenList, { tokens: ctrl.tokens }),
            m('button.button.is-success.is-medium', {
              onclick: ctrl.request
            }, 'Request Token')
          ]),
          m('.column.is-offset-1.is-3',
            m('.container', [
              m('p.title.is-4', 'What\'s this?'),
              m('p.content',
                m.trust(`<p>On this page you can view the currently active tokens and request a new one.</p>
                         <p>Using tokens you can invite other people to play on your server.</p>
                         <p>Just generate a new token and give it someone them, it's that easy.</p>
                         <p><strong>Note</strong> that tokens are one-shot, one token can only be used
                         once.</p>`))
            ]))
        ])
      ]))
  ]);
};

export default TokenManagement;
