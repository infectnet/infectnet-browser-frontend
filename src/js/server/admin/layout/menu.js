import TopMenu from '../../../common/components/top-menu';

const Menu = {
  vm: {
    init() {
      Menu.vm.routes = [
        {
          name: 'Dashboard',
          path: '/server/admin'
        },
        {
          name: 'Manage Tokens',
          path: '/server/admin/tokens'
        }
      ];
    }
  },
  controller() {
    Menu.vm.init();

    return TopMenu.controller({ routes: Menu.vm.routes });
  },
  view: TopMenu.view
};

export default Menu;
