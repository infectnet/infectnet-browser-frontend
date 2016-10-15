import m from 'mithril';

import Menu from './menu';

const ServerLayout = {
  constructView(childContent) {
    return [Menu, m('div', childContent)];
  }
};

export default ServerLayout;
