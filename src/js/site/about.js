import m from 'mithril';

import SiteRealm from './site-realm';

const About = Object.create(SiteRealm);

About.view = function view() {
  return this.constructView([
    m('h1', 'About')
  ]);
};

export default About;
