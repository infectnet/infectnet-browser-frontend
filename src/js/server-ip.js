let ip = null;

const set = function set(value) {
  ip = value;
};

const isSet = function isSet() {
  return ip !== null;
};

const retrieve = function retrieve() {
  return ip;
};

export default {
  set,
  isSet,
  retrieve
};
