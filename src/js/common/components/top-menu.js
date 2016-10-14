import m from 'mithril';

const TopMenu = {
  controller(options) {
    return {
      isSelected(path) {
        return m.route() === path;
      },
      getSelectedOption() {
        return m.route();
      },
      routes: options.routes
    };
  },
  view(ctrl) {
    return m('header', m('nav', ctrl.routes.map(routeToOption)));

    function routeToOption(route) {
      const anchorClass = ctrl.isSelected(route.path) ? 'selected' : '';

      return m('span', m('a', { config: m.route, href: route.path, class: anchorClass }, route.name));
    }
  }
};

export default TopMenu;
