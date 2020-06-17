<<<<<<< HEAD
const client = require('../kubernetes-config');
=======
// const client = require('../../k8s-client/config');
>>>>>>> docker

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
<<<<<<< HEAD
      await client.api.v1
        .namespaces(namespace)
=======
      // await res.locals.client.api.v1;
      await res.locals.client.api.v1
        .namespaces('default')
>>>>>>> docker
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
