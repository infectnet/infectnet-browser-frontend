import Request from '../../common/services/request';

const createDetector = function createDetector(request) {
  const detect = function detect(success, error) {
    request.req({
      method: 'GET',
      url: '/info'
    }).then(function receivedOk(data) {
      const fp = data.fingerprint;

      if (fp) {
        if (fp.name && fp.version) {
          if (fp.name === 'InfectNet' && fp.version === '0.2.0') {
            success();

            return;
          }
        }
      }

      // Should return messsage key instead of message
      error(`The server with the given IP does not look like an InfectNet server.
             Are you sure you've entered the address of an InfectNet server?`);
    }, error.bind(null, `Could not connect to the server with the given IP address.
                         Please make sure, you've entered the right address.`));
  };

  return {
    detect
  };
};

const Detector = createDetector(Request);

Detector.create = createDetector;

export default Detector;
