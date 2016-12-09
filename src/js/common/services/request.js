import m from 'mithril';

import ServerIp from './server-ip';

const ofAddress = function ofAddress(address, options) {
  return fromProvider(() => address, options);
};

const fromProvider = function fromProvider(addressProvider, options = { useHttps: false }) {
  const getAddress = function getAddress() {
    let address = addressProvider();

    if (!address.startsWith('http://') && !address.startsWith('https://')) {
      address = `${options.useHttps ? 'https' : 'http'}://${address}`;
    }

    return address;
  };

  const req = function req(opts) {
    const optionsCopy = Object.assign({}, opts);

    optionsCopy.url = `${getAddress()}${opts.url}`;

    return m.request(optionsCopy);
  };

  const withAuth = function withToken(authProvider, opts) {
    // We don't want to lose the original config
    const extendedConfig = function extendedConfig(xhr) {
      authProvider.authFunc(xhr);

      if (typeof opts.config === 'function') {
        opts.config(xhr);
      }
    };

    const extendedOptions = Object.assign({}, opts);

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
