var jsonServer = require('json-server');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

var server = jsonServer.create();
var middlewares = jsonServer.defaults();

var port = 3000;
var dummyCredentials = {
  username: 'user',
  password: 'pw'
};

var jwtSecret = "secret";

server.use(bodyParser.json());
server.use(middlewares);

server.post('/admin/login', function login(req, res) {
  var credentials = req.body;

  if (credentials.username === dummyCredentials.username &&
      credentials.password === dummyCredentials.password) {
    var token = jwt.sign({
      data: {
        username: credentials.username
      }
    }, jwtSecret, { expiresIn: '1h' });

    console.log(token);

    res.json({ token: token });
  } else {
    res.send("asd");
  }
});

server.listen(port, function serverStarted() {
  console.log('JSON Server is running on port ' + port);
});
