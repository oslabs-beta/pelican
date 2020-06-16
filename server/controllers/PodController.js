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
  updatePod: async (req, res, next) => {
    try {
      res.locals.client.api.v1
        .namespaces(namespace || 'default')
        .pods(req.query.name)
        .put({ body: req.body });
    } catch (err) {
      next({
        log: `Encountered an error in PodController.update: ${err}`,
        status: 400,
        message: 'An error occured updating pods',
      });
    }
  },
};
