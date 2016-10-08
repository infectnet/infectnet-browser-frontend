import Request from './request';
import JwtAuth from './jwt-auth';

const Token = {
  init(tokenString, expirationDate) {
    this.tokenString = () => tokenString;

    this.expirationDate = () => expirationDate;

    return this;
  },
  list() {
    const LIST_URL = '/admin/token';

    return Request.withAuth(JwtAuth, {
      method: 'GET',
      url: LIST_URL
    }).then(function mapToTokenList(tokens) {
      return tokens.map(function transformValue(value) {
        return Object.create(Token).init(value.token, value.expDate);
      });
    }, []);
  },
  requestNew() {
    const REQUEST_NEW_URL = '/admin/token';

    return Request.withAuth(JwtAuth, {
      method: 'POST',
      url: REQUEST_NEW_URL
    }).then(function mapToToken(value) {
      return Object.create(Token).init(value.token, value.expDate);
    }, null);
  }
};

export default Token;
