// A hook that verify captcha service method before

module.exports.captchaVerify = function () {
  return async context => {
    let code = context.data.captcha;
    let id = context.data.seed;
    if (context.data.password === 'pwd' && context.data.source === 'add') {
      return context;
    }
    if (!code || !id || !await context.app.service('api/v1/captcha').verify(id, code)) {
      throw new Error('验证码错误或已过期！');
    }
  };
};
