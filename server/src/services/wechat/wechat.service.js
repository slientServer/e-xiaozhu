// Initializes the `wechat` service on path `/api/v1/wechat`
// const createService = require('feathers-mongoose');
// const createModel = require('../../models/wechat.model');
const hooks = require('./wechat.hooks');
var WechatAPI = require('wechat-api');

module.exports = function (app) {
  // const Model = createModel(app);
  // const paginate = app.get('paginate');
  const api = new WechatAPI(app.get('wechat').appid, app.get('wechat').appsecret);

  // const options = {
  //   name: 'wechat',
  //   Model,
  //   paginate
  // };

  // Initialize our service with any options it requires
  // var dbService = createService(options);
  app.use('/api/v1/wechat', {
    async find (params) {
      if (params.query.type === 'users') {
        return await new Promise((resolve, reject) => {
          try {
            api.getFollowers((err, openiddata) => {
              api.batchGetUsers(((openiddata && openiddata.data && openiddata.data.openid) || []), (err, usersdata) => {
                resolve({'data': usersdata.user_info_list});
              });
            }); 
          } catch (err) {
            reject('Api request failed!' + err);
          }         
        });
      }
    }
  });

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/v1/wechat');

  service.hooks(hooks);
};
