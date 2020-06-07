const { Client } = require('kubernetes-client');

// for now you must have a local cluster running for the backend to start
// we will have to add auth and other try catches to allow program to run before a user has logged in
module.exports = new Client({ version: '1.13' }); // used to be 1.13
