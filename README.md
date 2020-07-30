# Pelican, the Kubernetes Deployment Dashboard

Pelican is a Kubernetes rollout dashboard that you can run locally connecting to any cluster or as a docker image connecting to an existing EKS cluster.  Pelican allows you to check the status of your deployment, edit configurations, scale deployments, and rollout new images to your deployments using different deployment strategies.  
![homepage](https://i.imgur.com/9gYeh4T.png)
## Getting started
Pelican can either be run locally or within your Kubernetes cluster using our supplied docker image
### Running locally
First, ensure that your kubectl tool is configured to point to your desired cluster with `kubectl config current-context`.  Your desired cloud provider will have detailed instructions on how to configure your kubectl interface.  Once you have confirmed that kubectl is configured, simply fork and clone this repo.  cd into the Pelican directory and sequentially run the following commands:
```
npm run build
npm start
```
Pelican will serve on localhost:8080
### Running as a docker image
Download our docker image from INSERT DOCKER IMAGE HERE.  When you run the image, provide the following environment variables:
```
K8S_CLUSTER_HOST=*your cluster endpoint*
K8S_AUTH_TOKEN=*your cluster name*
AWS_ACCESS_KEY_ID=*your AWS access key*
AWS_SECRET_ACCESS_KEY=*your AWS secret access key*
```
An example command would be: 

`docker run --env K8S_CLUSTER_HOST=[INSERT YOUR CLUSTER URL] --env K8S_AUTH_TOKEN=[INSERT YOUR CLUSTER NAME] --env K8S_CLUSTER_VERSION=[INSERT YOUR CLUSTER VERSION] --env AWS_ACCESS_KEY_ID=[INSERT YOUR AWS ACCESS KEY] --env AWS_SECRET_ACCESS_KEY=[INSERT YOUR AWS SECRET ACCESS KEY] --publish 3001:3000 --detach --name pelican ~~our image~~`

The container should now be correctly configured and you can begin using Pelican.

## Using Pelican
Pelican opens to your running pods for all namespaces.  You can use the namespace dropdown selector to zero in on a particular namespace.
Each object (pods, nodes, deployments, and nodes) have different information displayed and also has a button linking to an individual view.  This individual view lists the object's configuration as well as current status.  Deployments offer you the ability to change the image in the deployment and select a rollout method: standard, blue-green, and canary.  Once the health of the rollout has been confirmed, your new deployment will be live.
![deployment rollout](https://i.imgur.com/yn8Sojn.png)
