import m from 'mithril';

import Animation from '../../common/util/animation';
import Cond from '../../common/util/cond';
import mx from '../../common/util/mx';
import { i18n } from '../../common/services/i18n';

const IpForm = {
  vm: {
    init() {
      IpForm.vm.isIpValid = m.prop(false);
      IpForm.vm.ipAddress = '';
      IpForm.vm.isFormErroneous = m.prop(false);
      IpForm.vm.isLoading = m.prop(false);

      IpForm.vm.errorMessage = m.prop('');
      IpForm.vm.messageElementHandle = m.prop(null);
    }
  },
  controller(options) {
    IpForm.vm.init();

    return {
      ip(...args) {
        if (args.length > 0) {
          IpForm.vm.ipAddress = args[0];

          IpForm.vm.isIpValid(options.validator(args[0]));

          IpForm.vm.isFormErroneous(false);
        }

        return IpForm.vm.ipAddress;
      },
      submit(e) {
        e.preventDefault();

        if (IpForm.vm.isIpValid()) {
          IpForm.vm.isLoading(true);

          m.redraw.strategy('diff');

          m.redraw(true);

          options.onsave(IpForm.vm.ipAddress, function error(message) {
            IpForm.vm.isLoading(false);

            IpForm.vm.errorMessage(message);

            Animation.fadesIn(null, IpForm.vm.messageElementHandle());

            // Causes the IpField not to get redrawn
            m.redraw.strategy('diff');
          });
        } else {
          IpForm.vm.isFormErroneous(true);
        }
      }
    };
  },
  view(ctrl) {
    const errCond = Cond(IpForm.vm.isFormErroneous());
    const loadCond = Cond(IpForm.vm.isLoading());

    const messageContainer = mx.getElement('.container.is-hidden', {
      elementProp: IpForm.vm.messageElementHandle
    },
      [
        m('.columns', m('.column')), // kind of a hack, but we need some space
        m('.columns.is-mobile',
          m('.column.is-4.is-offset-4',
            m('.notification.is-danger.has-text-left', [
              m('button.delete', { onclick() { Animation.fadesOut(null, IpForm.vm.messageElementHandle()); } }),
              m.trust(IpForm.vm.errorMessage())]
            )
          )
        )
      ]
    );

    return m('container', [
      m('form.control.has-addons.has-addons-centered', [
        m('input.input.is-medium', {
          type: 'text',
          placeholder: i18n.t('common:Server IP Address'),
          oninput: m.withAttr('value', ctrl.ip),
          class: errCond.ifTrue('is-danger')
        }),
        m('button.button.is-medium', {
          onclick: ctrl.submit,
          class: [errCond.cond('is-danger', 'is-success'), loadCond.ifTrue('is-loading')].join(' ')
        }, errCond.cond(i18n.t('common:Error.Invalid address'), i18n.t('common:Play')))
      ]),
      messageContainer
    ]);
  }
};

export default IpForm;
