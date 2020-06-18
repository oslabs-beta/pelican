const client = require('../kubernetes-config');

module.exports = {
  getServices: async (req, res, next) => {
    const { namespace } = req.query;
    if (namespace) {
      try {
        res.locals.services = (
          await client.api.v1.namespaces('default').services.get()
        ).body.items;
        console.log(res.locals.services);
        return next();
      } catch (err) {
        next({
          log: `Encountered an error in ServiceController.get: ${err}`,
          status: 400,
          message: 'An error occured fetching services
    const {config, patch } = req.body;
    const {name} = req.query;
      try {
        res.locals.services = (await client.api.v1.services.get()).body.items;
        next();
      } catch (errname
        next({\
          log: `Encountered an error in ServiceController.get: ${err}`,
          status: 400,
          message: 'An error occured fetching services',
        });
      }
  },
  updateService: async (req, res, next) => {
    console.log('req body: ', req.body);
    const namespace = req.body.namespace || 'default';
    const { name } = req.query;
    const { config, deployment } = req.body;
    console.log('config: ', config);
    if (deployment) {
      try {
        await client.api.v1
          .namespaces(namespace)
          .services(name)
          .patch({
            body: { spec: { selector: config }, metadata: { labels: config } },
          });
        next();
      } catch (err) {
        next({
          log: `Encountered an error in ServiceController.update: ${err}`,
          status: 500,
          message: 'An error occured updating the service',
        });
      }
    } else {
      try {
        await client.api.v1
          .namespaces(namespace)
          .services(name)
          .put({ body: config });
        next();
      } catch (err) {
        next({
          log: `Encountered an error in ServiceController.update: ${err}`,
          status: 500,
          message: 'An error occured updating the service',
        });
      }
    }
  },
};
