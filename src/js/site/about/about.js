import m from 'mithril';

import SiteLayout from '../layout/site-layout';
import memberView from './member-view';

const About = Object.create(SiteLayout);

About.view = function view() {
  return this.constructView([
    m('section.section',
      m('.container', [
        m('.heading', [
          m('h1.title', 'About'),
          m('h2.subtitle', 'The people behind InfectNet')
        ]),
        m('hr'),
        m('h2.subtitle', `
          InfectNet is developed by a small team of Computer Science students from the University of Debrecen.`),
        m('container', [
          memberView({
            name: 'Marianna Szabó',
            github: 'szabom5',
            img: 'assets/img/marianna-szabo.jpg',
            title: 'Backend Developer',
            info: `As a wizard of AI and Java, Marianna spends most of her time developing the business logic
                   behind InfectNet on the backend.`
          }),
          memberView({
            name: 'István Lakatos',
            github: 'daergoth',
            img: 'assets/img/istvan-lakatos.jpg',
            title: 'Backend Developer',
            info: `Passionate Java developer who guarantees the stability of our API. When not implementing
                   the next killer feature, István is writing some great tests, the way every dev should do.`
          }),
          memberView({
            name: 'Attila Bagossy',
            github: 'battila7',
            img: 'assets/img/attila-bagossy.jpg',
            title: 'Frontend Developer',
            info: `The only frontend developer and JavaScript enthusiast on the project. Interested in functional
                   programming and all kinds of JS libraries.`
          }),
        ])
      ]))
  ]);
};

export default About;
