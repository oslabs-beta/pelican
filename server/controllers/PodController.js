const kubernetes = require('../../k8s-client/config');

module.exports = {
  getPods: async (req, res, next) => {
    try {
      res.locals.pods = (
        await res.locals.client.api.v1.namespaces('default').pods.get()
      ).body.items;
      next();
    } catch (err) {
      next({
        log: `Encountered an error in PodController.getPods: ${err}`,
        status: 400,
        message: 'An error occured fetching pods',
      });
    }
  },
};
