import m from 'mithril';

import ServerIp from '../server-ip';

const IpField = {
  vm: {
    init() {
      IpField.vm.isValid = m.prop('false');
      IpField.vm.isPristine = m.prop('true');
      IpField.vm.ipAddress = '';
    }
  },
  controller(args) {
    IpField.vm.init();

    return {
      ip(str) {
        if (arguments.length > 0) {
          IpField.vm.ipAddress = str;

          IpField.vm.isValid(ServerIp.validate(str));

          IpField.vm.isPristine(false);
        }

        return IpField.vm.ipAddress;
      },
      submit() {
        args.onsave(IpField.vm.ipAddress);
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
