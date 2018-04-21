const assert = require('assert');
const app = require('../../src/app');

describe('\'captcha\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/v1/captcha');

    assert.ok(service, 'Registered the service');
  });
});
