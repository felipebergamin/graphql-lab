/* eslint-disable */
const { readFileSync } = require('fs');
const { resolve } = require('path');

const schema = readFileSync(resolve(__dirname, 'schema.graphql'));
module.exports = schema;
