var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var dummyCredentials = {
  username: 'user',
  password: 'pw'
};

function credentialsMatch(credentials) {
  return credentials.username === dummyCredentials.username &&
         credentials.password === dummyCredentials.password;
}

module.exports = function security(server, options) {
  server.use(expressJwt({ secret: options.jwtSecret})
              .unless({path: ['/admin/login']}));

  server.post('/admin/login', function login(req, res) {
    var credentials = req.body;

    if (credentialsMatch(credentials)) {
      var token = jwt.sign({
        data: { username: credentials.username }
      }, options.jwtSecret, { expiresIn: '1h' });

      res.json({ token: token });
    } else {
      res.boom.forbidden();
    }
  });
};
