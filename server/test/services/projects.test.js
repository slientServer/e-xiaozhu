const assert = require('assert');
const app = require('../../src/app');

describe('\'projects\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/v1/projects');

    assert.ok(service, 'Registered the service');
  });
});
