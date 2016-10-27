import m from 'mithril';

import Menu from './layout/menu';
import AdminLayout from './layout/admin-layout';

const AdminDashboard = Object.create(AdminLayout);

AdminDashboard.controller = function controller() {
  if (AdminDashboard.checkRedirect()) {
    return;
  }
};

AdminDashboard.view = function view() {
  return m('section.hero.is-fullheight', [
    m('.hero-head', m('.container', Menu)),
    m('.hero-body', m('.container', [
      m('.heading', [
        m('h1.title', 'Admin page'), // Not i18n'd yet, because it's under development
        m('h2.subtitle', 'Under development')
      ])
    ])
  )]);
};

export default AdminDashboard;
