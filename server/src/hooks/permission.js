// A hook that verify permission service method before
const { iff } = require('feathers-hooks-common');
const { authenticate } = require('@feathersjs/authentication').hooks;
const jwtDecode = require('jwt-decode');
const { NotAuthenticated } = require('@feathersjs/errors');

module.exports.permissionCheck = function () {
  return (iff(
    async context => {
      if (!context.params.provider) {
        return true;
      } else {
        let params = jwtDecode(context.params.headers.authorization);
        if ((params.permission >= context.app.get('permission').admin || params.usersId === context.id) && (await context.app.service('/blacklist').verifyValidation(context.params.headers.authorization))) {
          
          return true;
        } else {
          return false;
        }
      }
    },
    [authenticate('jwt')]
  ).else(() => {
    throw new NotAuthenticated('Permission denied!');
  }));
};
