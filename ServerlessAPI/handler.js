'use strict';

const fetch = require('node-fetch');
const PageInfo = require('./pageinfo');

module.exports.info = (event, context, callback) => {
  const url = event.url;
  const pi = new PageInfo(url);
  pi.getData().then(data => {
    console.log('=============================');
    console.log(data);
    callback(null, data);
  });
};
