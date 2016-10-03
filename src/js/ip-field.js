import m from 'mithril';

const IpField = {
  vm: {
    init() {
      IpField.vm.isValid = m.prop('false');
      IpField.vm.isPristine = m.prop('true');
      IpField.vm.ipAddress = m.prop('');
    }
  },
  controller(args) {
    IpField.vm.init();

    const ipRegex =
      /(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;

    return {
      validate(str) {
        IpField.vm.isValid(ipRegex.test(str));

        IpField.vm.isPristine(false);

        if (IpField.vm.isValid()) {
          IpField.vm.ipAddress(str);
        }
      },
      submit() {
        args.onsave(IpField.vm.ipAddress());
      }
    };
  },
  view(ctrl) {
    return m('div', [
      m('input', { type: 'text', placeholder: 'Enter the IP address', onchange: m.withAttr('value', ctrl.validate) }),
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
