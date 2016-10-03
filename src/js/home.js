import m from 'mithril';

import Menu from './menu';
import IpField from './ip-field';
import ServerIp from './server-ip';

const Home = {
  controller() {
    return {
      save(ip) {
        ServerIp.set(ip);

        m.route('/server');
      }
    };
  },
  view(ctrl) {
    return [Menu, m.component(IpField, { onsave: ctrl.save })];
  }
};

export default Home;
