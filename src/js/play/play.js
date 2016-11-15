import m from 'mithril';

import WebSocketService from '../common/services/web-socket';

const Play = {};

Play.getRoutes = function getRoutes() {
  return {
    '/play': Play
  };
};

Play.controller = function controller() {
  if (!WebSocketService.isOpen()) {
    m.route('/server/login');
  }
};

Play.view = function view() {
  return [m('div', [
    m('h1', 'Game of the Year 2016')
  ])];
};

export default Play;
