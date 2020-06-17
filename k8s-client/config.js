// const { Client } = require('kubernetes-client');

// // for now you must have a local cluster running for the backend to start
// // we will have to add auth and other try catches to allow program to run before a user has logged in
// module.exports = new Client({ version: '1.13' }); // used to be 1.13

const { Client } = require('kubernetes-client');
process.env.K8S_CLUSTER_HOST =
  'https://BE3DBEB1751C393538174C4EE018B442.gr7.us-east-1.eks.amazonaws.com';
process.env.K8S_AUTH_TOKEN = 'test';
//  'aHR0cHM6Ly9zdHMuYW1hem9uYXdzLmNvbS8_QWN0aW9uPUdldENhbGxlcklkZW50aXR5JlZlcnNpb249MjAxMS0wNi0xNSZYLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFTV0VKTDRJSUQ1Rko3RjYyJTJGMjAyMDA2MTMlMkZ1cy1lYXN0LTElMkZzdHMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDIwMDYxM1QxODA3NDlaJlgtQW16LUV4cGlyZXM9MCZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QlM0J4LWs4cy1hd3MtaWQmWC1BbXotU2lnbmF0dXJlPTZiNDgzN2RmODMwYzVkZjc2MTBmMjQ2ZjU1ODlhNmRlMWQwMzkzYWRiMDRmMGYyMjYyZmNlOTA3YTUyODZjMTU';
process.env.K8S_CLUSTER_VERSION = '1.10';
process.env.AWS_ACCESS_KEY_ID = 'AKIASWEJL4IID5FJ7F62';
process.env.AWS_SECRET_ACCESS_KEY = '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';
process.env.AWS_PROFILE = 'default';
async function main() {
  try {
    const client = new Client({
      config: {
        url: process.env.K8S_CLUSTER_HOST,
        auth: {
          provider: {
            type: 'cmd',
            config: {
              'cmd-path': 'aws-iam-authenticator',
              'cmd-args': `token -i ${process.env.K8S_AUTH_TOKEN}`,
              'cmd-env': {
                AWS_PROFILE: process.env.AWS_PROFILE,
              },
              'token-key': 'status.token',
            },
          },
        },
        insecureSkipTlsVerify: true,
      },
      version: process.env.K8S_CLUSTER_VERSION,
    });
    // Fetch all the pods
    // const pods = await client.api.v1.namespaces('default').pods.get();
    // pods.body.items.forEach((item) => {
    //   console.log(item.metadata);
    // });
    // //
    // // Fetch the Deployment from the kube-system namespace.
    // //
    // const deployment = await client.apis.apps.v1
    //   .namespaces('kube-system')
    //   .deployments()
    //   .get();
    // deployment.body.items.forEach((item) => {
    //   console.log(item.metadata);
    // });
    // // console.log(client);
  } catch (err) {
    console.error('Error: ', err);
  }
}
main();
