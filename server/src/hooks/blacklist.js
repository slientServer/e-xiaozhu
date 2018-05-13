module.exports.addToBlacklist = function () {
  return async context => {
    context.app.service('/blacklist').create({
      token: context.params.headers.authorization
    });
  };
};

module.exports.refreshToken = function () {
  return async context => {
    app.service('api/v1/authentication').create();
  };
};