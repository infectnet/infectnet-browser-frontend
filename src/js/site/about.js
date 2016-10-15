import m from 'mithril';

import SiteLayout from './layout/site-layout';

const About = Object.create(SiteLayout);

About.view = function view() {
  return this.constructView([
    m('h1', 'About')
  ]);
};

export default About;
