import TopMenu from '../../common/top-menu';

const Menu = {
  vm: {
    init() {
      Menu.vm.routes = [
        {
          name: 'Login',
          path: '/server/login'
        },
        {
          name: 'Register',
          path: '/server/register'
        },
        {
          name: 'Admin Dashboard',
          path: '/server/admin'
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
