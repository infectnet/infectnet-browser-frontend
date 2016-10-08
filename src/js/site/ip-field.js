import m from 'mithril';

import ServerIp from '../model/server-ip';

const IpField = {
  vm: {
    init() {
      IpField.vm.isValid = m.prop('false');
      IpField.vm.isPristine = m.prop('true');
      IpField.vm.ipAddress = '';
    }
  },
  controller(options) {
    IpField.vm.init();

    return {
      ip(...args) {
        if (args.length > 0) {
          IpField.vm.ipAddress = args[0];

          IpField.vm.isValid(ServerIp.validate(args[0]));

          IpField.vm.isPristine(false);
        }

        return IpField.vm.ipAddress;
      },
      submit() {
        options.onsave(IpField.vm.ipAddress);
      }
    };
  },
  view(ctrl) {
    return m('div', [
      m('input', { type: 'text', placeholder: 'Enter the IP address', onchange: m.withAttr('value', ctrl.ip) }),
      m('div', { style: { display: displayError() } }, 'The IP address is invalid!'),
      m('button', { disabled: isSubmitDisabled(), onclick: ctrl.submit }, 'Go!')
    ]);

    function displayError() {
      const status = !IpField.vm.isValid() && !IpField.vm.isPristine();

      return (status ? '' : 'none');
    }

    function isSubmitDisabled() {
      return !IpField.vm.isValid() || IpField.vm.isPristine();
    }
  }
};

export default IpField;
