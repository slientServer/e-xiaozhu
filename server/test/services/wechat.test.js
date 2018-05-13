const assert = require('assert');
const app = require('../../src/app');

describe('\'wechat\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/v1/wechat');

    assert.ok(service, 'Registered the service');
  });
});
