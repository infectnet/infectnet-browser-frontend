import Request from './request';

const createRegister = function createRegister(request) {
  const REGISTER_URL = '/register';

  const register = function register(data) {
    return request.req({
      method: 'POST',
      url: REGISTER_URL,
      data
    });
  };

  return {
    register
  };
};

const Register = createRegister(Request);

Register.create = createRegister;

export default Register;
