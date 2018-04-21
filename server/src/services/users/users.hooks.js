const { authenticate } = require('@feathersjs/authentication').hooks;
const { captchaVerify } = require('../../hooks/captcha');
const { iff } = require('feathers-hooks-common');
const jwtDecode = require('jwt-decode');
const { NotAuthenticated } = require('@feathersjs/errors');

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt') ],
    get: iff(
      context => {
        let params = jwtDecode(context.params.headers.authorization);
        if (params.permission >= context.app.get('permission').admin || params.usersId === context.id) {
          return true;
        } else {
          return false;
        }
      },
      [authenticate('jwt') ]
    ).else(() => {
      throw new NotAuthenticated('Permission denied!');
    }),
    create: [ captchaVerify(), hashPassword() ],
    update: [ hashPassword(),  authenticate('jwt') ],
    patch: [ hashPassword(),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
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
