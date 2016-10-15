import m from 'mithril';
import Animation from '../../common/util/animation';
import ServerIp from '../../common/services/server-ip';

import SiteLayout from '../layout/site-layout';
import IpField from './ip-field';
import Menu from '../layout/menu';
import Detector from './detector';

const Home = Object.create(SiteLayout);

Home.vm = {
  init() {
    Home.vm.errorMessage = m.prop('');

    Home.vm.messageElementHandle = m.prop(null);
  }
};

Home.controller = function controller() {
  Home.vm.init();

  return {
    commitIp(ip, done) {
      ServerIp.set(ip);

      Detector.detect(function success() {
        m.route('/server');
      }, function err(message) {
        ServerIp.discard();

        Home.vm.errorMessage(message);

        Animation.fadesIn(null, Home.vm.messageElementHandle());

        // Causes the IpField not to get redrawn
        m.redraw.strategy('diff');
      });

      done();
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

  const messageContainer = m('.container.is-hidden', {
    config: function attach(element) {
      Home.vm.messageElementHandle(element);
    }
  },
    [
      m('.columns', m('.column')), // kind of a hack, but we need some space
      m('.columns.is-mobile',
        m('.column.is-4.is-offset-4',
          m('.notification.is-danger.has-text-left', [
            m('button.delete', { onclick() { Animation.fadesOut(null, Home.vm.messageElementHandle()); } }),
            m.trust(Home.vm.errorMessage())]
          )
        )
      )
    ]
  );

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
          ipFieldContainer,
          messageContainer
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
