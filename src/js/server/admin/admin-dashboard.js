import m from 'mithril';

import AdminLayout from './layout/admin-layout';

const AdminDashboard = Object.create(AdminLayout);

AdminDashboard.controller = function controller() {
  if (AdminDashboard.checkRedirect()) {
    return;
  }
};

AdminDashboard.view = function view() {
  return this.constructView([m('h1', 'Hello!')]);
};

export default AdminDashboard;
