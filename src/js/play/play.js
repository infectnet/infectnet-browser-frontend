import m from 'mithril';

import PlayLayout from './play-layout';

const Play = Object.create(PlayLayout);

Play.getRoutes = function getRoutes() {
  return {
    '/play': Play
  };
};

Play.view = function view() {
  return this.constructView(m('h1', 'Game Of The Year 2016'));
};

export default Play;
