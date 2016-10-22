import m from 'mithril';

import { i18n } from '../../common/services/i18n';

const ServerInfo = {};

ServerInfo.view = function view() {
  return m('section.section', [
    m('.container',
      m('div', [
        m('p.title.is-2', i18n.t('server:Info.Server Info')),
        m('p.subtitle.is-4', i18n.t('server:Info.Server Info Subtitle'))
      ]))
  ]);
};

export default ServerInfo;
