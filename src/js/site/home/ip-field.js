import m from 'mithril';

import Cond from '../../common/util/cond';

const IpField = {
  vm: {
    init() {
      IpField.vm.isIpValid = m.prop(false);
      IpField.vm.ipAddress = '';
      IpField.vm.isFormErroneous = m.prop(false);
      IpField.vm.isLoading = m.prop(false);
    }
  },
  controller(options) {
    IpField.vm.init();

    return {
      ip(...args) {
        if (args.length > 0) {
          IpField.vm.ipAddress = args[0];

          IpField.vm.isIpValid(options.validator(args[0]));

          IpField.vm.isFormErroneous(false);
        }

        return IpField.vm.ipAddress;
      },
      submit(e) {
        e.preventDefault();

        if (IpField.vm.isIpValid()) {
          IpField.vm.isLoading(true);

          m.redraw.strategy('diff');

          m.redraw(true);

          options.onsave(IpField.vm.ipAddress, function done() {
            IpField.vm.isLoading(false);
          });
        } else {
          IpField.vm.isFormErroneous(true);
        }
      }
    };
  },
  view(ctrl) {
    const errCond = Cond(IpField.vm.isFormErroneous());
    const loadCond = Cond(IpField.vm.isLoading());

    return m('form.control.has-addons.has-addons-centered', [
      m('input.input.is-medium', {
        type: 'text',
        placeholder: 'Server IP Address',
        oninput: m.withAttr('value', ctrl.ip),
        class: errCond.ifTrue('is-danger')
      }),
      m('button.button.is-medium', {
        onclick: ctrl.submit,
        class: [errCond.cond('is-danger', 'is-success'), loadCond.ifTrue('is-loading')].join(' ')
      }, errCond.cond('Invalid Address!', 'Play'))
    ]);
  }
};

export default IpField;
