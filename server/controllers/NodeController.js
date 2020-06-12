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
};
