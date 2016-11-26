import m from 'mithril';

import WebSocketService from '../common/services/web-socket';
import Menu from './layout/menu';

const Play = {};

Play.getRoutes = function getRoutes() {
  return {
    '/play': Play
  };
};

Play.controller = function controller() {
  /* if (!WebSocketService.isOpen()) {
    m.route('/server/login');
  }*/
};

Play.view = function view() {
  return m('section.hero.is-fullheight.is-dark', [
    m('.hero-head', m('.container.is-marginless.is-fluid', Menu)),
    m('.hero-body.is-paddingless', m('.container.is-marginless.is-fluid', [
      m('.game-container.custom-text-centered', [
        m('canvas')
      ])
    ])),
    m('.bottom-panel.container.is-marginless.is-fluid', 'Bottom Panel')
  ]);
};

export default Play;
