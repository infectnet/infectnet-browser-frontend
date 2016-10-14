var jsonServer = require('json-server');
var bodyParser = require('body-parser');
var boom = require('express-boom');

var server = jsonServer.create();
var middlewares = jsonServer.defaults();

var port = 3000;

server.use(bodyParser.json());
server.use(middlewares);
server.use(boom());

require('./modules/security')(server, { jwtSecret: 'secret' });
require('./modules/tokens')(server);
require('./modules/register')(server);

server.listen(port, function serverStarted() {
  console.log('JSON Server is running on port ' + port);
});
