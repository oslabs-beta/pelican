module.exports = {
  getServices: async (req, res, next) => {
    try {
      res.locals.services = (
        await res.locals.client.api.v1
          .namespaces(namespace || 'default')
          .services() //maybe no need
          .get()
      ).body.items;
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
    try {
      await res.locals.client.api.v1
        .namespaces('default')
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
