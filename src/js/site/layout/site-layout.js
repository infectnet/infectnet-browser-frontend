import m from 'mithril';
import Menu from './menu';

const SiteLayout = {
  constructView(childContent) {
    return [Menu, m('div', childContent)];
  }
};

export default SiteLayout;
