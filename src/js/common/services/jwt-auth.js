import jwtDecode from 'auth0/jwt-decode';

import Request from './request';

const LOGIN_URL = '/admin/login';
const RENEW_URL = '/admin/renew';

const createJwtAuth = function createJwtAuth(request) {
  let expirationTime = null;

  const storageKey = function storageKey() {
    return `${request.getAddress()}_token`;
  };

  const cacheExpiration = function cacheExpiration(storedToken) {
    if (expirationTime === null && storedToken !== null) {
      const tokenData = jwtDecode(storedToken);

      expirationTime = tokenData.exp;

      return !isExpired();
    }

    return true;
  };

  const token = function token(...args) {
    if (args.length > 0) {
      localStorage.setItem(storageKey(), args[0]);
    }

    let storedToken = localStorage.getItem(storageKey());

    // every time the token changes (or on startup) the expiration time gets cached
    if (!cacheExpiration(storedToken)) {
      expirationTime = null;
      storedToken = null;

      localStorage.removeItem(storageKey());
    }

    return storedToken;
  };

  const isExpired = function isExpired() {
    const THRESHOLD = 600;

    return (expirationTime - THRESHOLD) < (Date.now() / 1000);
  };

  const login = function login(credentials) {
    return request.req({
      method: 'POST',
      url: LOGIN_URL,
      data: credentials
    }).then(function success(data) {
      token(data.token);

      return true;
    }, false);
  };

  const renew = function renew() {
    return request.req(token, {
      method: 'POST',
      url: RENEW_URL,
      config: xhr => xhr.setRequestHeader('Authorization', `Bearer ${token()}`)
    }).then(function success(data) {
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
