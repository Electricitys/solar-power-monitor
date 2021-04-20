// Initializes the `devices` service on path `/devices`
const { Devices } = require('./devices.class');
const createModel = require('../../models/devices.model');
const hooks = require('./devices.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/devices', new Devices(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('devices');

  service.hooks(hooks);
};
