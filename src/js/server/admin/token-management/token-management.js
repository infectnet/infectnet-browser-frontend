import m from 'mithril';
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
  return this.constructView([
    m('h1', 'Tokens'),
    m.component(TokenList, { tokens: ctrl.tokens }),
    m('div', m('button', { onclick: ctrl.request }, 'Request'))
  ]);
};

export default TokenManagement;
