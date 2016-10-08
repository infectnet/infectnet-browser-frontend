import m from 'mithril';

import AdminRealm from './admin-realm';

const AdminDashboard = Object.create(AdminRealm);

AdminDashboard.controller = function controller() {
  AdminDashboard.checkRedirect();
};

AdminDashboard.view = function view() {
  return this.constructView(m('h1', 'Hello!'));
};

export default AdminDashboard;
