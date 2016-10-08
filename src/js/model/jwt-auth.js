import jwtDecode from 'jwt-decode';

import { Request } from './request';

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

    const storedToken = localStorage.getItem(storageKey());

    // every time the token changes (or on startup) the expiration time gets cached
    if (expirationTime === null) {
      const tokenData = jwtDecode(storedToken);

      expirationTime = tokenData.exp;
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
    if (isExpired()) {
      renew();
    }

    xhr.setRequestHeader('Authorization', `Bearer ${token()}`);
  };

  return {
    token: function tokenView() { return token(); },
    login,
    renew,
    authFunc
  };
};

const JwtAuth = createJwtAuth(Request);

JwtAuth.create = createJwtAuth;

export default JwtAuth;
