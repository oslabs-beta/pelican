const kubernetes = require('../../k8s-client/config');

module.exports = {
  getServices: async (req, res, next) => {
    try {
      const response = await kubernetes.api.v1
        .namespaces('default')
        .services() //maybe no need
        .get();
      res.locals.services = response.body.items;
      next();
    } catch (err) {
      next({
        log: `Encountered an error in ServiceController.get: ${err}`,
        status: 400,
        message: 'An error occured fetching services',
      });
    }
  },
};