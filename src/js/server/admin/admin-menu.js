import m from 'mithril';

const AdminMenu = {
  vm: {
    init() {
      const pathPrefix = '/server/admin';

      AdminMenu.vm.selected = m.route();

      AdminMenu.vm.options = [
        {
          name: 'Dashboard',
          path: `${pathPrefix}/`
        },
        {
          name: 'Manage Tokens',
          path: `${pathPrefix}/tokens`
        }
      ];
    }
  },
  controller() {
    AdminMenu.vm.init();

    return {
      selected(path) {
        return m.route() === path;
      }
    };
  },
  view(ctrl) {
    return m('header', m('nav', AdminMenu.vm.options.map(option)));

    function option(route) {
      const anchorClass = ctrl.selected(route.path) ? 'selected' : '';

      return m('span', m('a', { config: m.route, href: route.path, class: anchorClass }, route.name));
    }
  }
};

export default AdminMenu;
