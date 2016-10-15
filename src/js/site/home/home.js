import m from 'mithril';
import Animation from '../../common/util/animation';

import SiteLayout from '../layout/site-layout';
import IpField from './ip-field';
import ServerIp from '../../common/services/server-ip';
import Menu from '../layout/menu';

const Home = Object.create(SiteLayout);

Home.controller = function controller() {
  return {
    commitIp(ip) {
      ServerIp.set(ip);

      m.route('/server');
    },
    validate: ServerIp.validate
  };
};

Home.view = function view(ctrl) {
  const ipFieldContainer = m('.is-hidden', { config: function attach(element) {
    ipFieldContainer.domElement = element;
  } }, m.component(IpField, {
    validator: ctrl.validate, onsave: ctrl.commitIp
  }));

  return m('section.hero.is-dark.is-fullheight', [
    m('.hero-head',
      m('header', Menu)),
    m('.hero-body',
      m('.container.has-text-centered', [
        m('h1.title', 'The most infectious browser-game ever!'),
        m('.container', [
          m('a.button.is-danger.is-large', {
            onclick: Animation.fromEvent(Animation.fadesOut, function callback() {
              Animation.fadesIn(null, ipFieldContainer.domElement);
            })
          }, 'Play Now!'),
          ipFieldContainer
        ])
      ])),
    m('.hero-footer',
      m('.tabs..is-boxed.is-centered',
        m('.container',
          m('ul',
            m('li.is-active',
              m('a', m('strong', 'Scroll down for more!')))))))
  ]);
};

export default Home;
