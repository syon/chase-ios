'use strict';

const AWS = require('aws-sdk');
const fetch = require('node-fetch');
const Libra = require('./libra');

const s3 = new AWS.S3();

module.exports.info = (event, context, callback) => {
  const url = event.url;
  const libra = new Libra(url);
  libra.getData().then(data => {
    console.log('=============================');
    console.log(data);
    callback(null, data);
  });
};


module.exports.thumb = (event, context, callback) => {
  fetch(event.image_url)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      return Promise.reject(
        new Error(
          `Failed to fetch ${response.url}: ${response.status} ${response.statusText}`)
      );
    })
    .then(response => response.buffer())
    .then(buffer => (
      s3.putObject({
        Bucket: process.env.BUCKET,
        Key: event.key,
        Body: buffer,
      }).promise()
    ))
    .then(v => callback(null, v), callback);
};
