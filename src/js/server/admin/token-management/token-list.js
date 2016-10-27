import m from 'mithril';

import { i18n } from '../../../common/services/i18n';

const TokenList = {
  vm: {
    init() {
      TokenList.vm.inputMap = {};
    }
  },
  controller() {
    TokenList.vm.init();

    return {
      selectInputWithKey(key) {
        TokenList.vm.inputMap[key].select();
      }
    };
  },
  view(ctrl, args) {
    return m('.container', [
      m('p.title.is-4', i18n.t('admin:Token Management.Available Tokens')),
      m('table.table', [
        m('thead.has-text-centered',
          m('tr', [
            m('th', i18n.t('common:Token')),
            m('th', i18n.t('admin:Token Management.Expiration Date'))
          ])
        ),
        m('tbody', args.tokens().map(function toRow(token) {
          return m('tr', [
            m('td', selectable(token.tokenString())),
            m('td', token.expirationDate())
          ]);
        }))
      ])
    ]);

    function selectable(tokenString) {
      return m('p.control.has-addons', [
        m('input.input[readonly].token-input', {
          config(element) { TokenList.vm.inputMap[tokenString] = element; },
          type: 'text',
          value: tokenString }),
        m('a.button.is-info', {
          onclick() {
            ctrl.selectInputWithKey(tokenString);
          }
        }, i18n.t('common:Select'))
      ]);
    }
  }
};

export default TokenList;
