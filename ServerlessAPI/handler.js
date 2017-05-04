'use strict';

const AWS = require('aws-sdk');
const gm = require('gm').subClass({ imageMagick: true });
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
  const itemId = event.pocket_id;
  const suggested = event.suggested
  const item10Id = `0000000000${itemId}`.substr(-10, 10);
  const itemId3 = item10Id.slice(0, 3);
  const s3path = `items/thumbs/${itemId3}/${item10Id}.jpg`;
  console.log('S3 Path --', s3path);
  try {
    if (suggested) {
      fetchAndConvertAndPut(s3path, suggested, callback);
    } else {
      const libra = new Libra(event.url);
      libra.getData().then(data => {
        fetchAndConvertAndPut(s3path, data.image, callback);
      });
    }
  } catch (e) {
    putBlankImage(s3path);
    callback(null, 'Done.');
  }
};

function fetchAndConvertAndPut(s3path, imageUrl, callback) {
  console.log('Detected image URL --', imageUrl);
  fetch(imageUrl)
    .then(response => {
      if (response.ok) {
        response.buffer().then(buffer => {
          gm(buffer)
            .resize(420)
            .background('#fff')
            .flatten()
            .toBuffer('jpg', (err, buf) => {
              console.log('Resized Buffer --', buf);
              putImage(s3path, buf).promise()
                .then(v => callback(null, v));
            });
        })
      }
    }, err => {
      putBlankImage(s3path);
      callback(null, 'Done.');
    });
}

function putBlankImage(s3path) {
  console.log('Fetch failed. Using blank image.');
  gm('./blank.jpg').toBuffer('jpg', (err, buf) => {
    console.log('Blank image Buffer --', buf);
    putImage(s3path, buf);
  });
}

function putImage(s3path, buffer) {
  console.log(`Putting image on S3 (${s3path}):`, buffer);
  return s3.putObject({
    Bucket: process.env.BUCKET,
    Key: s3path,
    Body: buffer,
  }, (err, data) => {
    if (err) { console.log('Error:', err); }
    if (data) { console.log('Success:', data); }
  });
}
