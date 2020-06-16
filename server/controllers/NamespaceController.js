import client from '../kubernetes-config';

module.exports = {
  getNamespaces: async (req, res, next) => {
    try {
      res.locals.namespaces = (
        await client.api.v1.namespaces.get()
      ).body.items.map((namespace) => namespace.metadata.name);
      next();
    } catch (err) {
      next({
        log: `Encountered an error in NameSpaceController.getNamespaces: ${err}`,
        status: 400,
        message: 'An error occured fetching namespace',
      });
    }
  },
};
