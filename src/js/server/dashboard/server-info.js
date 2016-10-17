import m from 'mithril';

const ServerInfo = {};

ServerInfo.view = function view() {
  return m('section.section', [
    m('.container',
      m('div', [
        m('p.title.is-2', 'Server Info'),
        m('p.subtitle.is-4', 'Everything you need to know before battle')
      ]))
  ]);
};

export default ServerInfo;
