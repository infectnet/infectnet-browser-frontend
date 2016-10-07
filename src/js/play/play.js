import m from 'mithril';

import PlayRealm from './play-realm';

const Play = Object.create(PlayRealm);

Play.view = function view() {
  return this.constructView(m('h1', 'Game Of The Year 2016'));
};

export default Play;