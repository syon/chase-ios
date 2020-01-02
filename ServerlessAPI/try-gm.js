const AWS = require('aws-sdk')
const gm = require('gm').subClass({ imageMagick: true })
const fs = require('fs')
const fetch = require('node-fetch')

const s3 = new AWS.S3()
const imageUrl =
  'https://assets-cdn.github.com/images/modules/open_graph/github-mark.png'

// fetch(imageUrl)
//   .then((response) => {
//     if (response.ok) {
//       return response;
//     }
//   })
//   .then(response => {
//     return {
//       contentType: response.headers.get('content-type'),
//       buffer: response.buffer()
//     }
//   })
//   .then(({ contentType, buffer }) => {
//     const m = contentType.match(/image\/(gif|jpg|jpeg|png|svg|svg\+xml)/)
//     let ext = m ? m[1] : ''
//     ext = ext.replace(/jpeg/, 'jpg')
//     ext = ext.replace(/svg\+xml/, 'svg')
//     console.log('ext:', ext)
//     buffer.then(b => {
//       gm(b).resize(400).toBuffer('jpg', (err, buf) => {
//         putImageFile(buf)
//       });
//     })
//   })

function putImageFile(buffer) {
  const filename = 'try.jpg'
  fs.writeFile(filename, buffer, 'binary', (err) => {
    if (err) throw err
    console.log('File saved.')
    gm(filename).format((err, value) => {
      console.log(value)
    })
  })
}

function png2jpg() {
  const s3path = 'items/blank.jpg'
  // gm('./blank.jpg').toBuffer('jpg', (err, buf) => {
  //   console.log('Blank image Buffer --', buf);
  //   putImage(s3path, buf);
  // });

  // https://github.com/aheckmann/gm/issues/415
  gm('stackoverflow.png')
    .resize(400)
    .background('#fff')
    .flatten()
    .toBuffer('jpg', (err, buf) => {
      putImageFile(buf)
    })
}

function putImage(s3path, buffer) {
  console.log(`Putting image on S3 (${s3path}):`, buffer)
  const res = s3.putObject(
    {
      Bucket: 'syon-chase',
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

png2jpg()
