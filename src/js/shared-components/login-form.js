import m from 'mithril';

const LoginForm = {};

LoginForm.vm = {
  init() {
    LoginForm.vm.isValid = m.prop(false);
    LoginForm.vm.shouldDisplayError = m.prop(false);

    LoginForm.vm.username = m.prop('');
    LoginForm.vm.password = m.prop('');
    LoginForm.vm.errorMessage = m.prop('');
  }
};

LoginForm.controller = function controller(options) {
  LoginForm.vm.init();

  const validate = function validate() {
    const result = options.validate(LoginForm.vm.username(), LoginForm.vm.password());

    LoginForm.vm.isValid(result.isValid);
    LoginForm.vm.shouldDisplayError(result.isValid);

    LoginForm.vm.errorMessage(result.errorMessage);
  };

  return {
    errorMessage() {
      return LoginForm.vm.errorMessage();
    },
    username(value) {
      LoginForm.vm.username(value);

      validate();
    },
    password(value) {
      LoginForm.vm.password(value);

      validate();
    },
    login() {
      options.login({
        username: LoginForm.vm.username(),
        password: LoginForm.vm.password()
      });
    }
  };
};

LoginForm.view = function view(ctrl) {
  return m('div', binds(ctrl), [
    m('input', { name: 'username', type: 'text', placeholder: 'Username' }),
    m('input', { name: 'password', type: 'password', placeholder: 'Password' }),
    m('div', { style: { display: displayError() } }, ctrl.errorMessage()),
    m('button', { disabled: isSubmitDisabled(), onclick: ctrl.login }, 'Login')
  ]);

  function displayError() {
    return (!LoginForm.vm.shouldDisplayError() ? '' : 'none');
  }

  function isSubmitDisabled() {
    return !LoginForm.vm.isValid();
  }

  function binds(data) {
    return {
      onchange(e) {
        data[e.target.name](e.target.value);
      },
      oninput() {
        LoginForm.vm.shouldDisplayError(false);
      }
    };
  }
};

export default LoginForm;
