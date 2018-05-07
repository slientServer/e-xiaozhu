// A hook that verify captcha service method before
const { permissionCheck } = require('./permission');

module.exports.captchaVerify = function () {
  return async context => {
    if (context.params.headers.authorization) {
      permissionCheck();
    } else {
      let code = context.data.captcha;
      let id = context.data.seed;
      if (!code || !id || !await context.app.service('api/v1/captcha').verify(id, code)) {
        throw new Error('验证码错误或已过期！');
      }
    }
  };
};
