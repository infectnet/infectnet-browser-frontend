import m from 'mithril';

const Component = {
  vm: {
    init(text) {
      Component.vm.description = m.prop(text);
    }
  },
  controller() {
    Component.vm.init('Change this text!');
  },
  view() {
    return m('div', [
      m('input', { onchange: m.withAttr('value', Component.vm.description), value: Component.vm.description() }),
      m('h2', Component.vm.description())
    ]);
  }
};

m.mount(document.body, Component);
