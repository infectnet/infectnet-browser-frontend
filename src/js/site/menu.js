import m from 'mithril';

const Menu = {
  vm: {
    init() {
      Menu.vm.selected = m.route();

      Menu.vm.options = [
        {
          name: 'Home',
          path: '/'
        }
      ];
    }
  },
  controller() {
    Menu.vm.init();

    return {
      selected(path) {
        return m.route() === path;
      }
    };
  },
  view(ctrl) {
    return m('header', m('nav', Menu.vm.options.map(option)));

    function option(route) {
      const anchorClass = ctrl.selected(route.path) ? 'selected' : '';

      return m('span', m('a', { config: m.route, href: route.path, class: anchorClass }, route.name));
    }
  }
};

export default Menu;
