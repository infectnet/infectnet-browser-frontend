import tape from 'tape';

import { newServerIp } from '../src/js/model/server-ip';

const malformedIps = ['asd', '1.1.1.1.', '256.1.0.1', '0.1', ''];

const correctIps = ['1.1.1.1', '127.0.0.1', '255.255.1.2'];

tape('isSet() should return false when there is no stored IP', (assert) => {
  const serverIp = newServerIp();

  assert.equal(serverIp.isSet(), false);

  assert.end();
});

tape('validate() should not accept malformed IP address', (assert) => {
  const serverIp = newServerIp();

  malformedIps.forEach(ip => assert.equal(serverIp.validate(ip), false));

  assert.end();
});

tape('IPs rejected by validate() should also be rejected by set()', (assert) => {
  const serverIp = newServerIp();

  malformedIps.forEach(ip => assert.equal(serverIp.set(ip), false));

  assert.end();
});

tape('validate() should accept correct IP address', (assert) => {
  const serverIp = newServerIp();

  correctIps.forEach(ip => assert.equal(serverIp.validate(ip), true));

  assert.end();
});

tape('IPs accepted by validate() should also be accepted by set()', (assert) => {
  const serverIp = newServerIp();

  correctIps.forEach(ip => assert.equal(serverIp.set(ip), true));

  assert.end();
});

tape('IP stored with set() should be returned by retrieve()', (assert) => {
  const serverIp = newServerIp();

  const dummyIp = '127.0.0.1';

  assert.equal(serverIp.set(dummyIp), true);

  assert.equal(serverIp.retrieve(), dummyIp);

  assert.end();
});
