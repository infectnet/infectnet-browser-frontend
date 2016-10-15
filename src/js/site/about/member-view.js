import m from 'mithril';

const memberView = function memberView(data) {
  return m('.columns.is-mobile', [
    m('.column.is-narrow',
      m('figure.image.is-128x128',
        m('img', { src: data.img }))),
    m('.column',
      m('.container', [
        m('h1.title.is-4',
          m.trust(`${data.name} <a href="http://github.com/${data.github}">@${data.github}</a>`)),
        m('h2.subtitle.is-5', data.title),
        m('.content', data.info)
      ]))
  ]);
};

export default memberView;
