import m from 'mithril';
import Menu from './menu';

const SiteRealm = {
  constructView(childContent) {
    return [Menu, m('div', childContent)];
  }
};

export default SiteRealm;
