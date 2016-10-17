import m from 'mithril';

import Animation from '../../common/util/animation';
import Cond from '../../common/util/cond';

import ServerIp from '../../common/services/server-ip';
import { i18n } from '../../common/services/i18n';

import IpForm from './ip-form';
import Menu from '../layout/menu';
import Detector from './detector';

const Home = {};

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
    validate: ServerIp.validate,
    hasIp: ServerIp.isSet,
    getIp: ServerIp.retrieve
  };
};

Home.view = function view(ctrl) {
  const ipFormContainer = m('.is-hidden', { config: function attach(element) {
    ipFormContainer.domElement = element;
  } }, m.component(IpForm, {
    validator: ctrl.validate, onsave: ctrl.commitIp
  }));

  const ipSetCond = Cond(ctrl.hasIp());

  return m('section.hero.is-dark.is-fullheight', [
    m('.hero-head',
      m('.container', Menu)),
    m('.hero-body',
      m('.container.has-text-centered', [
        m('h1.title', i18n.t('home:Welcome message')),
        m('.container', [
          m('a.button.is-danger.is-large', {
            onclick: Animation.fromEvent(Animation.fadesOut, function callback() {
              Animation.fadesIn(null, ipFormContainer.domElement);
            }),
            class: ipSetCond.ifTrue('is-hidden')
          }, 'Play Now!'),
          m('a.button.is-danger.is-large', {
            config: m.route,
            href: '/server',
            class: ipSetCond.ifFalse('is-hidden')
          }, `Back to ${ctrl.getIp()}`),
          ipFormContainer
        ]),
      ])),
    m('.hero-footer',
      m('.tabs.is-boxed.is-centered',
        m('.container',
          m('ul',
            m('li.is-active',
              m('a', m('strong', 'Scroll down for more!')))))))
  ]);
};

export default Home;
