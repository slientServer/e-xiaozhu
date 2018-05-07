const users = require('./users/users.service.js');
const captcha = require('./captcha/captcha.service.js');
const projects = require('./projects/projects.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(captcha);
  app.configure(projects);
};
