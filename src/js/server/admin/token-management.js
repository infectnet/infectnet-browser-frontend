import m from 'mithril';
import AdminRealm from './admin-realm';

const TokenManagement = Object.create(AdminRealm);

TokenManagement.controller = function controller() {
  AdminRealm.checkRedirect();
};

TokenManagement.view = function view() {
  return this.constructView(m('h1', 'Tokens'));
};

export default TokenManagement;
