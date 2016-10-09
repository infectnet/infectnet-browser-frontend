import m from 'mithril';

const ServerRealm = {
  constructView(childContent) {
    return [m('div', childContent)];
  }
};

export default ServerRealm;
