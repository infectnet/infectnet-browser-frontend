module.exports = function info(server) {
  server.get('/info', function (req, res) {
    res.json({
      fingerprint: {
        name: 'InfectNet',
        version: '0.1.0'
      }
    });
  });
}
