const gm = require('gm').subClass({ imageMagick: true });
const fs = require('fs')
const fetch = require('node-fetch');

const imageUrl = 'https://assets-cdn.github.com/images/modules/open_graph/github-mark.png'

fetch(imageUrl)
  .then((response) => {
    if (response.ok) {
      return response;
    }
  })
  .then(response => {
    return {
      contentType: response.headers.get('content-type'),
      buffer: response.buffer()
    }
  })
  .then(({ contentType, buffer }) => {
    const m = contentType.match(/image\/(gif|jpg|jpeg|png|svg|svg\+xml)/)
    let ext = m ? m[1] : ''
    ext = ext.replace(/jpeg/, 'jpg')
    ext = ext.replace(/svg\+xml/, 'svg')
    console.log('ext:', ext)
    buffer.then(b => {
      gm(b).resize(400).toBuffer('jpg', (err, buf) => {
        putImageFile(buf)
      });
    })
  })

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

// function png2jpg() {
//   const filename = 'blank.png'
//   gm(filename).toBuffer('jpg', (err, buf) => {
//     fs.writeFile('blank.jpg', buf, 'binary', (err) => {
//       if (err) throw err
//       console.log('done.')
//     })
//   });
// }
// png2jpg();
