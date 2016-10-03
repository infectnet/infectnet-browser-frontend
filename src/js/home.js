import m from 'mithril';

import Menu from './menu';
import IpField from './ip-field';

const Home = {
  view() {
    return [Menu, m.component(IpField, { onsave: str => console.log(`Received IP: ${str}`) })];
  }
};

export default Home;
