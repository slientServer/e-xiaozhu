// Initializes the `captcha` service on path `/api/v1/captcha`
const createService = require('feathers-mongoose');
const createModel = require('../../models/captcha.model');
const svgCaptcha = require('svg-captcha');
const hooks = require('./captcha.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'captcha',
    Model,
    paginate
  };

  const captchaOptions = {
    size: 4,
    noise: 8,
    color: true,
    background: '#2592FC'
  };

  // Initialize our service with any options it requires
  app.use('/api/v1/captcha', {
    async get () {
      let captcha = svgCaptcha.createMathExpr(captchaOptions);
      let res= await createService(options).create({
        code: captcha.text,
        expire: app.get('captchaexpire')*60*1000
      });
      return {
        seed: res._id.toString(),
        data: captcha.data
      };
    },

    verify: async (id, code) => {
      let res= await createService(options).get(id, {});
      if (res && res.code.toLowerCase() === code.toLowerCase() && new Date().valueOf() <= new Date(res.createdAt).valueOf() + res.expire && !res.isused) {
        createService(options).patch(id, {'isused': true}, {});
        return true;
      } else {
        return false;
      }
    }
  });

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/v1/captcha');

  service.hooks(hooks);
};
