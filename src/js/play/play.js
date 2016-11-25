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
  return m('section.hero.is-fullheight.is-black', [
    m('.hero-head', m('.container.is-fluid', Menu)),
    m('.hero-body', m('.container.is-fluid', [
      m('.heading', [
        m('h1.title', 'Game of the Year 2016')
      ])
    ])
  )]);
};

export default Play;
