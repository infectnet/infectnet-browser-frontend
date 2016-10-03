import m from 'mithril';

import ServerIp from './server-ip';

const ServerDashboard = {
  controller() {
    if (!ServerIp.isSet()) {
      m.route('/');
    }

    return {
      getIp() {
        return ServerIp.retrieve();
      }
    };
  },
  view(ctrl) {
    return m('div', [
      m('h1', `Connected to ${ctrl.getIp()}`),
      m('ul', ['Login', 'Register', 'Admin'].map(option))
    ]);

    function option(str) {
      return m('li', m('a', str));
    }
  }
};

export default ServerDashboard;
