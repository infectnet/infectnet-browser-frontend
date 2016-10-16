import m from 'mithril';

import Animation from '../../common/util/animation';
import Cond from '../../common/util/cond';

const RegisterForm = {};

RegisterForm.vm = {
  init() {
    RegisterForm.vm.isLoading = m.prop(false);

    RegisterForm.vm.errorMessage = m.prop('');

    RegisterForm.vm.notificationHandle = m.prop(null);

    RegisterForm.vm.fieldErrors = {};

    [{
      name: 'username',
      message: 'The username must not be empty.'
    }, {
      name: 'password',
      message: 'The password must meet the required criteria.'
    }, {
      name: 'email',
      message: 'Must be a valid email address.'
    }, {
      name: 'token',
      message: 'The token must not be empty.'
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
    m('p.title.is-4', 'Create your account at this server'),
    m('.notification.is-danger.is-hidden', {
      config(element) { RegisterForm.vm.notificationHandle(element); }
    }, [
      m('button.delete', {
        onclick() { Animation.fadesOut(null, RegisterForm.vm.notificationHandle()); }
      }),
      m.trust(RegisterForm.vm.errorMessage())
    ]),
    m('div', [
      addInput({
        label: 'Username',
        name: 'username',
        desc: 'A unique username that will identify you on the server.'
      }),
      addInput({
        label: 'Token',
        name: 'token',
        desc: 'The precious token you\'ve received from the server\'s administrator.'
      }),
      addInput({
        label: 'Email Address',
        name: 'email',
        desc: 'You will receive some news about the server, but only when we will add that feature.'
      }),
      addInput({
        label: 'Password',
        name: 'password',
        type: 'password',
        desc: 'Use lowercase letters with at least one uppercase letter and one numeral. The minimal length is eight.'
      }),
      m('hr'),
      m('p.content', 'We do not ask you to confirm your password, because we know you type it a few hundred times every day (or we were just lazy to implement that).'),
      m('hr'),
      m('p.control',
        m('button.button.is-medium.is-success', {
          onclick: ctrl.register,
          class: Cond(RegisterForm.vm.isLoading()).ifTrue('is-loading')
        }, 'Register'))
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
