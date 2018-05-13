const users = require('./users/users.service.js');
const captcha = require('./captcha/captcha.service.js');
const blacklist = require('./blacklist/blacklist.service.js');
const wechat = require('./wechat/wechat.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(captcha);
  app.configure(blacklist);
  app.configure(wechat);
};
