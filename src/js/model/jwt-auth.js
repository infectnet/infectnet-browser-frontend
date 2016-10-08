import request from './request';
import ServerIp from './server-ip';

const addToken = function addToken(ip, token) {
  localStorage.setItem(`${ip}_token`, token);
};

const JwtAuth = {
  authenticate() {
    if (!ServerIp.isSet()) {
      return false;
    }

    return request({ method: 'POST', url: `${ServerIp.retrieve()}/admin/login` })
            .then(function storeToken(data) {
              addToken(ServerIp.retrieve(), data.token);

              return true;
            }, () => false);
  }
};

export default JwtAuth;
