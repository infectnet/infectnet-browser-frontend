import m from 'mithril';

import ServerIp from './server-ip';

const ofAddress = function ofAddress(address) {
  return fromProvider(() => address);
};

const fromProvider = function fromProvider(addressProvider) {
  const req = function req(options) {
    const optionsCopy = Object.assign({}, options);

    optionsCopy.url = `${addressProvider()}${options.url}`;

    return m.request(optionsCopy);
  };

  const withAuth = function withToken(authProvider, options) {
    // We don't want to lose the original config
    const extendedConfig = function extendedConfig(xhr) {
      authProvider.authFunc(xhr);

      options.config(xhr);
    };

    const extendedOptions = Object.assign({}, options);

    extendedOptions.config = extendedConfig;

    return req(extendedOptions);
  };

  const getAddress = function getAddress() {
    return addressProvider();
  };

  return {
    req,
    withAuth,
    getAddress
  };
};

const Request = fromProvider(ServerIp.retrieve);

Request.fromProvider = fromProvider;
Request.ofAddress = ofAddress;

export default Request;
