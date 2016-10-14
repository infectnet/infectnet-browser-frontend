import m from 'mithril';

import ServerRealm from './server-realm';
import ServerIp from '../model/server-ip';

const ServerDashboard = Object.create(ServerRealm);

ServerDashboard.vm = {
  init() {
    ServerDashboard.vm.options = [
      {
        name: 'Login',
        path: '/login'
      },
      {
        name: 'Register',
        path: '/register'
      },
      {
        name: 'Admin Dashboard',
        path: '/admin'
      }
    ];
  }
};

ServerDashboard.controller = function controller() {
  if (!ServerIp.isSet()) {
    m.route('/');

    return null;
  }

  ServerDashboard.vm.init();

  return {
    getIp() {
      return ServerIp.retrieve();
    }
  };
};

ServerDashboard.view = function view(ctrl) {
  return this.constructView(
    m('div', [
      m('h1', `Connected to ${ctrl.getIp()}`),
      m('ul', ServerDashboard.vm.options.map(mapOption))
    ]
  ));

  function mapOption(option) {
    return m('li', m('a', { config: m.route, href: `/server${option.path}` }, option.name));
  }
};

export default ServerDashboard;
