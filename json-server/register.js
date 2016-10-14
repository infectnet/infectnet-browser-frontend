const users = (function users() {
  const userArray = [];

  const validateData = function validateData(user) {
    return true;
  };

  const add = function add(user) {
    userArray.push(user);

    console.log('New registration: ' + user.username);
  };

  return {
    validateData: validateData,
    add: add
  };
}());

module.exports = function(server) {
  server.post('/register', function(req, res) {
    users.add(req.body);

    res.status(202).end();
  });
}