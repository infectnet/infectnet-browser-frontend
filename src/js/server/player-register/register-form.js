import m from 'mithril';

/* PlayerRegister.view = function view(ctrl) {
  return this.constructView(m('div', binding(ctrl), [
    m('div', m('input[required]', { name: 'username', type: 'text' })),
    m('div', m('input[required]', { name: 'email', type: 'email' })),
    m('div', m('input[required]', { name: 'token', type: 'text' })),
    m('div', m('input[required]', { name: 'password', type: 'password' })),
    m('div', m('input[required]', { name: 'passwordConfirmation', type: 'password' })),
    m('div', m('input', { type: 'submit', onclick: ctrl.submit }, 'Register'))
  ]));

  function binding(data) {
    return {
      onchange(e) {
        data[e.target.name](e.target.value);
      }
    };
  }
}; */

const RegisterForm = {};

RegisterForm.view = function view() {
  return m('.container', [
    m('p.title.is-4', 'Create your account at this server'),
    m('div', [
      m('label.label', 'Username'),
      m('p.control', [
        m('input.input.is-medium', { name: 'username', type: 'text' }),
        m('span.help', 'A unique username that will identify you on the server.')
      ]),
      m('label.label', 'Email Address'),
      m('p.control', [
        m('input.input.is-medium', { name: 'email', type: 'text' }),
        m('span.help', 'You will receive some news about the server, but only when we will add that feature.')
      ]),
      m('label.label', 'Password'),
      m('p.control', [
        m('input.input.is-medium', { name: 'password', type: 'password' }),
        m('span.help', 'Use lowercase letters with at least one uppercase letter and one numeral. The minimal length is eight.')
      ]),
      m('hr'),
      m('p.content', 'We do not ask you to confirm your password, because we know you type it a few hundred times every day (or we were just lazy to implement that).'),
      m('hr'),
      m('p.control',
        m('button.button.is-medium.is-success', 'Register'))
    ])
  ]);
};

export default RegisterForm;
