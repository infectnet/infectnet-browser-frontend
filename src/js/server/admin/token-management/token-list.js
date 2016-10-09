import m from 'mithril';

const TokenList = {
  view(ctrl, args) {
    const header = [
      m('th', 'Token'),
      m('th', 'Expiration Date')
    ];

    return m('table', [
      m('thead', header),
      m('tbody', args.tokens().map(function toRow(token) {
        return m('tr', [
          m('td', token.tokenString()),
          m('td', token.expirationDate())
        ]);
      }))
    ]);
  }
};

export default TokenList;
