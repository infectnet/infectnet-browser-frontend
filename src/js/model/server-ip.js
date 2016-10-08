const ipRegex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const newServerIp = function newServerIp() {
  let ip = null;

  const set = function set(value) {
    if (validate(value)) {
      ip = value;

      return true;
    }

    return false;
  };

  const validate = function validate(value) {
    return ipRegex.test(value);
  };

  const isSet = function isSet() {
    return ip !== null;
  };

  const retrieve = function retrieve() {
    return ip;
  };

  return {
    set,
    isSet,
    retrieve,
    validate
  };
};

export const ServerIp = newServerIp();
