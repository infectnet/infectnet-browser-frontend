const routes = {};

const addRoutes = function addRoutes(routeObj = {}) {
  // eslint-disable-next-line no-restricted-syntax
  for (const url in routeObj) {
    // URLs cannot be overridden
    if (!Object.prototype.hasOwnProperty.call(routes, url)) {
      routes[url] = routeObj[url];
    }
  }
};

const getRoutes = function getRoutes() {
  // Return a copy of the routes object, so it cannot be modified.
  return Object.assign({}, routes);
};

export default {
  addRoutes,
  getRoutes
};
