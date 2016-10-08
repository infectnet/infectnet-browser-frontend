import jwtDecode from 'auth0/jwt-decode';

import Request from './request';

const LOGIN_URL = '/admin/login';
const RENEW_URL = '/admin/renew';

const createJwtAuth = function createJwtAuth(request) {
  let expirationTime = null;

  const storageKey = function storageKey() {
    return `${request.getAddress()}_token`;
  };

  const token = function token(...args) {
    if (args.length > 0) {
      localStorage.setItem(storageKey(), args[0]);
    }

    let storedToken = localStorage.getItem(storageKey());

    // every time the token changes (or on startup) the expiration time gets cached
    if (expirationTime === null && storedToken !== null) {
      const tokenData = jwtDecode(storedToken);

      expirationTime = tokenData.exp;

      if (isExpired()) {
        expirationTime = null;
        storedToken = null;

        localStorage.removeItem(storageKey());
      }
    }

    return storedToken;
  };

  const isExpired = function isExpired() {
    return expirationTime <= Date.now();
  };

  const login = function login(credetials) {
    return request.req({ method: 'POST', url: LOGIN_URL, data: credetials })
            .then(function success(data) {
              token(data.token);

              return true;
            }, false);
  };

  const renew = function renew() {
    // note the use of authFunc -> the old token gets sent
    return request.req(token, { method: 'POST', url: RENEW_URL, config: authFunc })
      .then(function success(data) {
        token(data.token);

        return true;
      }, false);
  };

  const authFunc = function authFunc(xhr) {
    if (expirationTime !== null && isExpired()) {
      renew();
    }

    xhr.setRequestHeader('Authorization', `Bearer ${token()}`);
  };

  const isAuthenticated = function isAuthenticated() {
    return token() !== null;
  };

  return {
    token: function tokenView() { return token(); },
    login,
    renew,
    isAuthenticated,
    authFunc
  };
};

const JwtAuth = createJwtAuth(Request);

JwtAuth.create = createJwtAuth;

export default JwtAuth;
