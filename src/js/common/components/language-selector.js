import m from 'mithril';
import mx from '../util/mx';
import Animation from '../util/animation';

const LanguageSelector = {};

LanguageSelector.vm = {
  init() {
    LanguageSelector.vm.selectorHandle = m.prop(null);
    LanguageSelector.vm.languagesHandle = m.prop(null);
  }
};

LanguageSelector.controller = function controller() {
  LanguageSelector.vm.init();

  return {
    selectLanguage() {
      Animation.toggle(null,
          LanguageSelector.vm.languagesHandle(), LanguageSelector.vm.selectorHandle());
    }
  };
};

LanguageSelector.view = function view(ctrl) {
  return m('.custom-display-inherit', [
    mx.getElement('a.nav-item', {
      elementProp: LanguageSelector.vm.selectorHandle,
      onclick() {
        Animation.toggle(null,
          LanguageSelector.vm.selectorHandle(), LanguageSelector.vm.languagesHandle());
      }
    }, m('.icon', m('i.fa.fa-language'))),
    mx.getElement('.custom-display-inherit.is-hidden', {
      elementProp: LanguageSelector.vm.languagesHandle
    }, [
      languageIcon('hu'),
      languageIcon('gb')
    ])
  ]);

  function languageIcon(lang) {
    return m('a.nav-item', {
      onclick: ctrl.selectLanguage.bind(null, lang)
    }, m('span.icon', m(`i.flag-icon.flag-icon-${lang}`)));
  }
};

export default LanguageSelector;
