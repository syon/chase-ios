const axios = require('axios')

const EP = 'https://6nxnfwxpej.execute-api.us-east-1.amazonaws.com/dev'

test('/thumb', async () => {
  const params = { url: 'http://www.mangataisho.com/', pocket_id: '0' }
  const res = await axios.get(`${EP}/thumb`, { params })
  console.log(res.data)
  expect(res.status).toBe(200)
})
