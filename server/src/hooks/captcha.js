// A hook that verify captcha service method before

module.exports.captchaVerify = function () {
  return async context => {
    let code = context.data.captcha;
    let id = context.data.seed;
    if (!code || !id || !await context.app.service('api/v1/captcha').verify(id, code)) {
      throw new Error('验证码错误或已过期！');
    }
  };
};
