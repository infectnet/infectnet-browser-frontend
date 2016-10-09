import m from 'mithril';
import AdminRealm from './admin-realm';
import { TokenService } from '../../model/token.js';

const TokenManagement = Object.create(AdminRealm);

const TokenList = {
  view(ctrl, args) {
    const header = [
      m('th', 'Token'),
      m('th', 'Expiration Date')
    ];

    return m('table', [
      m('thead', header),
      m('tbody', args.tokens().map(function toRow(token) {
        return m('tr', [
          m('td', token.tokenString()),
          m('td', token.expirationDate())
        ]);
      }))
    ]);
  }
};

TokenManagement.controller = function controller() {
  AdminRealm.checkRedirect();

  this.tokens = TokenService.list();

  this.request = function request() {
    TokenService.requestNew().then(controller.bind(this));
  }.bind(this);
};

TokenManagement.view = function view(ctrl) {
  return this.constructView([
    m('h1', 'Tokens'),
    m.component(TokenList, { tokens: ctrl.tokens }),
    m('div', m('button', { onclick: ctrl.request }, 'Request'))
  ]);
};

export default TokenManagement;
