// const client = require('../kubernetes-config');
const client = require('../kubernetes-config-aws');

module.exports = {
  getPods: async (req, res, next) => {
    try {
      res.locals.pods = (await client.api.v1.pods.get()).body.items;
      next();
    } catch (err) {
      next({
        log: `Encountered an error in PodController.getPods: ${err}`,
        status: 400,
        message: 'An error occured fetching pods',
      });
    }
  },
  updatePod: async (req, res, next) => {
    const namespace = req.body.namespace || 'default';
    try {
      // await res.locals.client.api.v1;
      await res.locals.client.api.v1
        .namespaces('default')
        .pods(req.query.name)
        .put({ body: req.body });
      next();
    } catch (err) {
      next({
        log: `Encountered an error in podController.update: ${err}`,
        status: 500,
        message: 'An error occured updating the pod',
      });
    }
  },
};
