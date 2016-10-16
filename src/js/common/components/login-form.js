import m from 'mithril';

import Cond from '../util/cond';
import Animation from '../util/animation';

const LoginForm = {};

LoginForm.vm = {
  init() {
    LoginForm.vm.isValid = m.prop(false);
    LoginForm.vm.shouldDisplayError = m.prop(false);

    LoginForm.vm.username = m.prop('');
    LoginForm.vm.password = m.prop('');
    LoginForm.vm.errorMessage = m.prop('');

    LoginForm.vm.isLoading = m.prop(false);
    LoginForm.vm.notificationHandle = m.prop(null);
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
      LoginForm.vm.isLoading(true);

      m.redraw.strategy('diff');

      m.redraw(true);

      options.login({
        username: LoginForm.vm.username(),
        password: LoginForm.vm.password(),
      }, function error(message) {
        LoginForm.vm.errorMessage(message);

        LoginForm.vm.shouldDisplayError(true);

        LoginForm.vm.isLoading(false);

        Animation.fadesIn(null, LoginForm.vm.notificationHandle);

        m.redraw.strategy('diff');
      });
    }
  };
};

LoginForm.view = function view(ctrl) {
  return m('div', binds(ctrl), [
    m('.notification.is-danger', {
      config: (element) => { LoginForm.vm.notificationHandle = element; },
      class: Cond(LoginForm.vm.shouldDisplayError()).ifFalse('is-hidden')
    }, [
      m('button.delete', {
        onclick() {
          Animation.fadesOut(null, LoginForm.vm.notificationHandle);

          LoginForm.vm.shouldDisplayError(false);
        }
      }),
      m.trust(LoginForm.vm.errorMessage())
    ]),
    m('label.label', 'Username'),
    m('p.control',
      m('input.input', { name: 'username', type: 'text' })),
    m('label.label', 'Password'),
    m('p.control',
      m('input.input', { name: 'password', type: 'password' })),
    m('p.control',
      m('button.button.is-success.is-medium.custom-max-width', {
        onclick: ctrl.login,
        class: Cond(LoginForm.vm.isLoading()).ifTrue('is-loading')
      }, 'Login'))
  ]);

  function binds(data) {
    return {
      onchange(e) {
        data[e.target.name](e.target.value);
      }
    };
  }
};

export default LoginForm;
