// Initializes the `projects` service on path `/api/v1/projects`
const createService = require('feathers-mongoose');
const createModel = require('../../models/projects.model');
const hooks = require('./projects.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'projects',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/v1/projects', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/v1/projects');

  service.hooks(hooks);
};
