import m from 'mithril';
import Menu from './menu';

const SiteLayout = {
  constructView(childContent) {
    return [m('header', Menu), childContent];
  }
};

export default SiteLayout;
