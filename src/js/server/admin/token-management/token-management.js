import m from 'mithril';

import Menu from '../layout/menu';
import AdminLayout from '../layout/admin-layout';

import { i18n } from '../../../common/services/i18n';

import { TokenService } from './token.js';

import TokenList from './token-list';

const TokenManagement = Object.create(AdminLayout);

TokenManagement.controller = function controller() {
  if (TokenManagement.checkRedirect()) {
    return;
  }

  this.tokens = TokenService.list();

  this.request = function request() {
    TokenService.requestNew().then(controller.bind(this));
  }.bind(this);
};

TokenManagement.view = function view(ctrl) {
  return m('div', [
    m('section.hero',
      m('.hero-head', m('.container', Menu))),
    m('section.section',
      m('.container', [
        m('.heading', [
          m('p.title', i18n.t('admin:Token Management.Token Management')),
          m('p.subtitle', i18n.t('admin:Token Management.Token Management Subtitle'))
        ]),
        m('hr'),
        m('.columns', [
          m('.column.is-offset-1.is-5', [
            m.component(TokenList, { tokens: ctrl.tokens }),
            m('button.button.is-success.is-medium', {
              onclick: ctrl.request
            }, i18n.t('admin:Token Management.Request Token'))
          ]),
          m('.column.is-offset-1.is-3',
            m('.container', [
              m('p.title.is-4', i18n.t('admin:Token Management.Info Title')),
              m('p.content',
                m.trust(i18n.t('admin:Token Management.Info Description')))
            ]))
        ])
      ]))
  ]);
};

export default TokenManagement;
