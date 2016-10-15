import m from 'mithril';
import Animation from '../../common/util/animation';
import ServerIp from '../../common/services/server-ip';

import SiteLayout from '../layout/site-layout';
import IpForm from './ip-form';
import Menu from '../layout/menu';
import Detector from './detector';

const Home = Object.create(SiteLayout);

Home.controller = function controller() {
  return {
    commitIp(ip, error) {
      ServerIp.set(ip);

      Detector.detect(function success() {
        m.route('/server');
      }, function err(message) {
        ServerIp.discard();

        error(message);
      });
    },
    validate: ServerIp.validate
  };
};

Home.view = function view(ctrl) {
  const ipFormContainer = m('.is-hidden', { config: function attach(element) {
    ipFormContainer.domElement = element;
  } }, m.component(IpForm, {
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
              Animation.fadesIn(null, ipFormContainer.domElement);
            })
          }, 'Play Now!'),
          ipFormContainer
        ]),
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
