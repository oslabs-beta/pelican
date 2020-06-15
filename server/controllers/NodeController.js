module.exports = {
  getNodes: async (req, res, next) => {
    try {
      res.locals.nodes = (
        await res.locals.client.api.v1.nodes.get()
      ).body.items;
      next();
    } catch (err) {
      next({
        log: `Encountered an error in NodeController.getNodes: ${err}`,
        status: 400,
        message: 'An error occured fetching nodes',
      });
    }
  },
  updateNode: async (req, res, next) => {
    try {
      await res.locals.client.apis.v1
        .nodes(req.query.name)
        .put({ body: req.body });
      next();
    } catch (err) {
      next({
        log: `Encountered an error in NodeController.update: ${err}`,
        status: 500,
        message: 'An error occured updating the node',
      });
    }
  },
};
