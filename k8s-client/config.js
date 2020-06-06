const { Client } = require('kubernetes-client');

module.exports = new Client({ version: '1.13' });
