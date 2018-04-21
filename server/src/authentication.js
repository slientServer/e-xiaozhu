const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const { captchaVerify } = require('./hooks/captcha');

module.exports = function (app) {
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('api/v1/authentication').hooks({
    before: {
      create: [
        captchaVerify(),
        authentication.hooks.authenticate(config.strategies),
        context => {
          context.params.payload = context.params.payload || {};
          Object.assign(context.params.payload, {
            permission: context.params.users.permission,
            username: context.params.users.username
          });
        }
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    }
  });
};
