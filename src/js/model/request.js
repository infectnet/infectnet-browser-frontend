import m from 'mithril';

const req = function req(options) {
  return m.request(options);
};

const request = req;

request.authenticated = function authenticated(token, options) {
  const authHeaderConfig = function authHeaderConfig(xhr) {
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
  };

  const extendedOptions = Object.assign({ config: authHeaderConfig }, options);

  return req(extendedOptions);
};

export default request;
