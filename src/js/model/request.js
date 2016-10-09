import m from 'mithril';

import ServerIp from './server-ip';

const ofAddress = function ofAddress(address) {
  return fromProvider(() => address);
};

const fromProvider = function fromProvider(addressProvider, useHttps = false) {
  const getAddress = function getAddress() {
    let address = addressProvider();

    if (!address.startsWith('http://') && !address.startsWith('https://')) {
      address = `${useHttps ? 'https' : 'http'}://${address}`;
    }

    return address;
  };

  const req = function req(options) {
    const optionsCopy = Object.assign({}, options);

    optionsCopy.url = `${getAddress()}${options.url}`;

    return m.request(optionsCopy);
  };

  const withAuth = function withToken(authProvider, options) {
    // We don't want to lose the original config
    const extendedConfig = function extendedConfig(xhr) {
      authProvider.authFunc(xhr);

      if (typeof options.config === 'function') {
        options.config(xhr);
      }
    };

    const extendedOptions = Object.assign({}, options);

    extendedOptions.config = extendedConfig;

    return req(extendedOptions);
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
