const axios = require('axios')

const EP = 'https://6nxnfwxpej.execute-api.us-east-1.amazonaws.com/dev'

test('/info', async () => {
  const params = { url: 'http://www.mangataisho.com/' }
  const res = await axios.get(`${EP}/info`, { params })
  console.log(res.data)
  expect(res.status).toBe(200)
})
