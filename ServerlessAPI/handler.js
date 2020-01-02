const AWS = require('aws-sdk')
const gm = require('gm').subClass({ imageMagick: true })
const fetch = require('node-fetch')
const Libra = require('./libra')
const s3 = new AWS.S3()

function success(bodyObj) {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(bodyObj)
  }
}

module.exports.info = (event, context, callback) => {
  const params = event.queryStringParameters
  const { url } = params
  const libra = new Libra(url)
  libra.getData().then((data) => {
    console.log('=============================')
    console.log(data)
    callback(null, success(data))
  })
}

module.exports.thumb = (event, context, callback) => {
  const params = event.queryStringParameters
  const { pocket_id, suggested } = params
  const item10Id = `0000000000${pocket_id}`.substr(-10, 10)
  const itemId3 = item10Id.slice(0, 3)
  const s3path = `items/thumbs/${itemId3}/${item10Id}.jpg`
  console.log('S3 Path --', s3path)
  try {
    if (isValidSuggestedUrl(suggested)) {
      fetchAndConvertAndPut(s3path, suggUrl, callback)
    } else {
      const libra = new Libra(event.url)
      libra.getData().then((data) => {
        fetchAndConvertAndPut(s3path, data.image, callback)
      })
    }
  } catch (e) {
    putBlankImage(s3path).then(() => {
      callback(null, success('Done.'))
    })
  }
}

function isValidSuggestedUrl(suggestedUrl) {
  if (suggestedUrl === 'undefined') {
    const msg = 'Suggested URL is Undefined.'
    console.log(msg)
    return false
  }
  return true
}

function fetchAndConvertAndPut(s3path, imageUrl, callback) {
  console.log('Detected image URL --', imageUrl)
  fetch(imageUrl).then(
    (response) => {
      if (response.ok) {
        response.buffer().then((buffer) => {
          const data = gm(buffer)
            .resize(420)
            .background('#fff')
            .flatten()
          gmToBuffer(data).then((buf) => {
            console.log('Resized Buffer --', buf)
            putImage(s3path, buf)
              .promise()
              .then((v) => callback(null, success(v)))
          })
        })
      }
    },
    (err) => {
      putBlankImage(s3path).then(() => {
        callback(null, success('Done.'))
      })
    }
  )
}

function putBlankImage(s3path) {
  console.log('Fetch failed. Using blank image.')
  const data = gm('./blank.jpg')
  return gmToBuffer(data).then((buf) => {
    console.log('Blank image Buffer --', buf)
    putImage(s3path, buf)
  })
}

function putImage(s3path, buffer) {
  console.log(`Putting image on S3 (${s3path}):`, buffer)
  return s3.putObject(
    {
      Bucket: process.env.BUCKET,
      Key: s3path,
      Body: buffer
    },
    (err, data) => {
      if (err) {
        console.log('Error:', err)
      }
      if (data) {
        console.log('Success:', data)
      }
    }
  )
}

function gmToBuffer(data) {
  return new Promise((resolve, reject) => {
    data.stream((err, stdout, stderr) => {
      if (err) {
        return reject(err)
      }
      const chunks = []
      stdout.on('data', (chunk) => {
        chunks.push(chunk)
      })
      // these are 'once' because they can and do fire multiple times for multiple errors,
      // but this is a promise so you'll have to deal with them one at a time
      stdout.once('end', () => {
        resolve(Buffer.concat(chunks))
      })
      stderr.once('data', (data) => {
        reject(String(data))
      })
    })
  })
}
