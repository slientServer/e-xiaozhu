const { captchaVerify } = require('../../hooks/captcha');
const { permissionCheck } = require('../../hooks/permission');
const { disable } = require('feathers-hooks-common');
const searchRegex = require('../../hooks/searchRegex');

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [ permissionCheck(), searchRegex()],
    get: [ permissionCheck() ],
    create: [ captchaVerify(), hashPassword() ],
    update: [ disable(), hashPassword(),  permissionCheck() ],
    patch: [ permissionCheck(), hashPassword() ],
    remove: [ permissionCheck() ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
