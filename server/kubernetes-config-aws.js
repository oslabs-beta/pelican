const { Client } = require('kubernetes-client');
process.env.AWS_PROFILE = 'default';

let client;
async function main() {
  try {
    client = new Client({
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
  } catch (err) {
    console.error('Error: ', err);
  }
}
main();
module.exports = client;
