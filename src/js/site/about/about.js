import m from 'mithril';

import Menu from '../layout/menu';
import memberView from './member-view';
import { i18n } from '../../common/services/i18n';

const About = {};

About.view = function view() {
  return m('section.hero', [
    m('.hero-head', m('.container', Menu)),
    m('.hero-body', m('.container', [
      m('.heading', [
        m('h1.title', i18n.t('site:About.About')),
        m('h2.subtitle', i18n.t('site:About.The people behind InfectNet'))
      ]),
      m('hr'),
      m('h2.subtitle', i18n.t('site:About.About Description')),
      m('container', [
        memberView({
          name: i18n.t('site:About.Marianna Szabó.name'),
          github: 'szabom5',
          img: 'assets/img/marianna-szabo.jpg',
          title: i18n.t('site:About.Backend Developer'),
          info: i18n.t('site:About.Marianna Szabó.info')
        }),
        memberView({
          name: i18n.t('site:About.István Lakatos.name'),
          github: 'daergoth',
          img: 'assets/img/istvan-lakatos.jpg',
          title: i18n.t('site:About.Backend Developer'),
          info: i18n.t('site:About.István Lakatos.info')
        }),
        memberView({
          name: i18n.t('site:About.Attila Bagossy.name'),
          github: 'battila7',
          img: 'assets/img/attila-bagossy.jpg',
          title: i18n.t('site:About.Frontend Developer'),
          info: i18n.t('site:About.Attila Bagossy.info')
        }),
      ])
    ]))
  ]);
};

export default About;
