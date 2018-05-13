// Initializes the `blacklist` service on path `/blacklist`
const createService = require('feathers-mongoose');
const createModel = require('../../models/blacklist.model');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'blacklist',
    Model,
    paginate
  };

  var service = createService(options);
  // Initialize our service with any options it requires
  app.use('/blacklist', {
    verifyValidation: async token => {
      var res = await service.find({query: {'token': token}});
      if (res.data && res.data.length > 0) {
        return false;
      } else {
        return true;
      }
    },
    async create (data) {
      return await service.create(data);
    }
  });

};
