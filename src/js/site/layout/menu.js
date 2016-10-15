import TopMenu from '../../common/components/top-menu';

const Menu = {
  vm: {
    init() {
      Menu.vm.routes = [
        {
          name: 'Home',
          path: '/'
        },
        {
          name: 'About',
          path: '/about'
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
