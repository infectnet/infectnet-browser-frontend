import m from 'mithril';

import ServerRealm from './server-realm';
import { serverIp } from '../model/server-ip';

const ServerDashboard = Object.create(ServerRealm);

ServerDashboard.controller = function controller() {
  if (!serverIp.isSet()) {
    m.route('/');
  }

  return {
    getIp() {
      return serverIp.retrieve();
    }
  };
};

ServerDashboard.view = function view(ctrl) {
  return this.constructView(
    m('div', [
      m('h1', `Connected to ${ctrl.getIp()}`),
      m('ul', ['Login', 'Register', 'Admin'].map(option))
    ]
  ));

  function option(str) {
    return m('li', m('a', str));
  }
};

export default ServerDashboard;
