import client from '../kubernetes-config';

module.exports = {
  getServices: async (req, res, next) => {
    try {
      res.locals.services = (await client.api.v1.services().get()).body.items;
      next();
    } catch (err) {
      next({
        log: `Encountered an error in ServiceController.get: ${err}`,
        status: 400,
        message: 'An error occured fetching services',
      });
    }
  },
  updateService: async (req, res, next) => {
    const namespace = req.body.namespace || 'default';
    try {
      await client.api.v1
        .namespaces(namespace)
        .services(req.query.name)
        .put({ body: req.body });
      next();
    } catch (err) {
      next({
        log: `Encountered an error in ServiceController.update: ${err}`,
        status: 500,
        message: 'An error occured updating the service',
      });
    }
  },
};
