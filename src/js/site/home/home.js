import m from 'mithril';

import SiteLayout from '../layout/site-layout';
import IpField from './ip-field';
import ServerIp from '../../model/server-ip';

const Home = Object.create(SiteLayout);

Home.controller = function controller() {
  return {
    commitIp(ip) {
      ServerIp.set(ip);

      m.route('/server');
    },
    validate: ServerIp.validate
  };
};

Home.view = function view(ctrl) {
  return this.constructView(m.component(IpField, {
    validator: ctrl.validate, onsave: ctrl.commitIp
  }));
};

export default Home;
