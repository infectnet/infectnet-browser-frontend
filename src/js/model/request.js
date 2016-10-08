import m from 'mithril';

import { ServerIp } from './server-ip';

export const ofAddress = function ofAddress(address) {
  return fromProvider(() => address);
};

export const fromProvider = function fromProvider(addressProvider) {
  const req = function req(options) {
    const optionsCopy = Object.assign({}, options);

    optionsCopy.url = `${addressProvider()}${options.url}`;

    return m.request(optionsCopy);
  };

  const withToken = function withToken(tokenProvider, options) {
    const authHeaderConfig = function authHeaderConfig(xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${tokenProvider()}`);
    };

    const extendedOptions = Object.assign({ config: authHeaderConfig }, options);

    return req(extendedOptions);
  };

  return {
    req,
    withToken
  };
};

export const Request = fromProvider(ServerIp.retrieve);
