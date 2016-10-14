import m from 'mithril';

import ServerLayout from './layout/server-layout';
import ServerIp from '../model/server-ip';

const ServerDashboard = Object.create(ServerLayout);

ServerDashboard.vm = {};

ServerDashboard.controller = function controller() {
  if (!ServerIp.isSet()) {
    m.route('/');

    return null;
  }

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
    ]
  ));
};

export default ServerDashboard;
