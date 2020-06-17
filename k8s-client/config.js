const { Client } = require('kubernetes-client');
process.env.K8S_CLUSTER_HOST =
  'https://BE3DBEB1751C393538174C4EE018B442.gr7.us-east-1.eks.amazonaws.com';
process.env.K8S_AUTH_TOKEN = 'test';
//  'aHR0cHM6Ly9zdHMuYW1hem9uYXdzLmNvbS8_QWN0aW9uPUdldENhbGxlcklkZW50aXR5JlZlcnNpb249MjAxMS0wNi0xNSZYLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFTV0VKTDRJSUQ1Rko3RjYyJTJGMjAyMDA2MTMlMkZ1cy1lYXN0LTElMkZzdHMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDIwMDYxM1QxODA3NDlaJlgtQW16LUV4cGlyZXM9MCZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QlM0J4LWs4cy1hd3MtaWQmWC1BbXotU2lnbmF0dXJlPTZiNDgzN2RmODMwYzVkZjc2MTBmMjQ2ZjU1ODlhNmRlMWQwMzkzYWRiMDRmMGYyMjYyZmNlOTA3YTUyODZjMTU';
process.env.K8S_CLUSTER_VERSION = '1.10';
process.env.AWS_ACCESS_KEY_ID = 'AKIASWEJL4IID5FJ7F62';
process.env.AWS_SECRET_ACCESS_KEY = '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';
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
