import Request from './request';
import JwtAuth from './jwt-auth';

export const Token = {
  init(tokenString, expirationDate) {
    this.tokenString = () => tokenString;
    this.expirationDate = () => expirationDate;

    return this;
  }
};

const createTokenService = function createTokenService(authProvider, request) {
  const LIST_URL = '/admin/tokens';
  const REQUEST_NEW_URL = '/admin/tokens';

  const list = function list() {
    return request.withAuth(authProvider, {
      method: 'GET',
      url: LIST_URL
    }).then(function mapToTokenList(tokens) {
      return tokens.map(function transformValue(value) {
        return Object.create(Token).init(value.token, value.expDate);
      });
    }, []);
  };

  const requestNew = function requestNew() {
    return request.withAuth(authProvider, {
      method: 'POST',
      url: REQUEST_NEW_URL
    }).then(function mapToToken(value) {
      return Object.create(Token).init(value.token, value.expDate);
    }, null);
  };

  return {
    list,
    requestNew
  };
};

export const TokenService = createTokenService(JwtAuth, Request);

TokenService.create = createTokenService;
