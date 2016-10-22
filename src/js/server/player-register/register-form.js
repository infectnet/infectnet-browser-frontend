import m from 'mithril';

import Animation from '../../common/util/animation';
import Cond from '../../common/util/cond';
import mx from '../../common/util/mx';
import { i18n } from '../../common/services/i18n';

const RegisterForm = {};

RegisterForm.vm = {
  init() {
    RegisterForm.vm.isLoading = m.prop(false);

    RegisterForm.vm.errorMessage = m.prop('');

    RegisterForm.vm.notificationHandle = m.prop(null);

    RegisterForm.vm.fieldErrors = {};

    [{
      name: 'username',
      message: i18n.t('common:Error.The username must not be empty')
    }, {
      name: 'password',
      message: i18n.t('common:Error.The password must meet the required criteria')
    }, {
      name: 'email',
      message: i18n.t('common:Error.Must be a valid email address')
    }, {
      name: 'token',
      message: i18n.t('common:Error.The token must not be empty')
    }].forEach(addToVm);

    function addToVm(property) {
      RegisterForm.vm[property.name] = m.prop('');

      RegisterForm.vm.fieldErrors[property.name] = {
        erroneous: m.prop(false),
        message() { return property.message; }
      };
    }
  }
};

RegisterForm.controller = function controller(options) {
  RegisterForm.vm.init();

  const validate = function validate() {
    // Just an example, should externalized
    if (RegisterForm.vm.username() === '') {
      RegisterForm.vm.fieldErrors.username.erroneous(true);

      return false;
    }

    return true;
  };

  return {
    register() {
      if (validate()) {
        const userData = {
          username: RegisterForm.vm.username(),
          password: RegisterForm.vm.password(),
          token: RegisterForm.vm.token(),
          email: RegisterForm.vm.email(),
        };

        RegisterForm.vm.isLoading(true);

        m.redraw.strategy('diff');

        m.redraw(true);

        options.register(userData, function error(message) {
          RegisterForm.vm.errorMessage(message);

          RegisterForm.vm.isLoading(false);

          Animation.fadesIn(null, RegisterForm.vm.notificationHandle());

          m.redraw.strategy('diff');
        });
      }
    }
  };
};

RegisterForm.view = function view(ctrl) {
  return m('.container', binds(), [
    m('p.title.is-4', i18n.t('server:Registration.Create your account at this server')),
    mx.getElement('.notification.is-danger.is-hidden', {
      elementProp: RegisterForm.vm.notificationHandle
    }, [
      m('button.delete', {
        onclick() { Animation.fadesOut(null, RegisterForm.vm.notificationHandle()); }
      }),
      m.trust(RegisterForm.vm.errorMessage())
    ]),
    m('div', [
      addInput({
        label: i18n.t('common:Username'),
        name: 'username',
        desc: i18n.t('server:Registration.Username Info')
      }),
      addInput({
        label: i18n.t('common:Token'),
        name: 'token',
        desc: i18n.t('server:Registration.Token Info')
      }),
      addInput({
        label: i18n.t('common:Email Address'),
        name: 'email',
        desc: i18n.t('server:Registration.Email Address Info')
      }),
      addInput({
        label: i18n.t('common:Password'),
        name: 'password',
        type: 'password',
        desc: i18n.t('server:Registration.Password Info')
      }),
      m('hr'),
      m('p.content', i18n.t('server:Registration.Common Info')),
      m('hr'),
      m('p.control',
        m('button.button.is-medium.is-success', {
          onclick: ctrl.register,
          class: Cond(RegisterForm.vm.isLoading()).ifTrue('is-loading')
        }, i18n.t('server:Registration.Register')))
    ])
  ]);

  function addInput(options = { type: 'text' }) {
    const errorCond = Cond(RegisterForm.vm.fieldErrors[options.name].erroneous());

    return m('div', [
      m('label.label', { for: options.name }, options.label),
      m('p.control', [
        m('input.input.is-medium', {
          name: options.name,
          type: options.type,
          class: errorCond.ifTrue('is-danger')
        }),
        m('span.help', {
          class: errorCond.ifTrue('is-hidden')
        }, options.desc),
        m('span.help.is-danger', {
          class: errorCond.ifFalse('is-hidden')
        }, RegisterForm.vm.fieldErrors[options.name].message())
      ])
    ]);
  }

  function binds() {
    return {
      onchange(e) {
        RegisterForm.vm[e.target.name](e.target.value);
      },
      oninput(e) {
        RegisterForm.vm.fieldErrors[e.target.name].erroneous(false);
      }
    };
  }
};

export default RegisterForm;
