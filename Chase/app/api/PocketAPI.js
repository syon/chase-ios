import 'url-search-params-polyfill'
import { Linking } from 'react-native'

export function getRequestToken(consumerKey, redirectUri) {
  return new Promise((resolve, reject) => {
    fetch('https://getpocket.com/v3/oauth/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Accept': 'application/json',
      },
      body: JSON.stringify({
        consumer_key: consumerKey,
        redirect_uri: redirectUri,
      })
    }).then((response) => {
      return response.json()
    }).then((json) => {
      resolve(json.code)
    }).catch((error) => {
      reject(error)
    })
  })
}

export function authorize(consumerKey, requestToken) {
  return new Promise((resolve, reject) => {
    fetch('https://getpocket.com/v3/oauth/authorize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Accept': 'application/json',
      },
      body: JSON.stringify({
        consumer_key: consumerKey,
        code: requestToken,
      }),
    }).then((response) => {
      console.tron.info('Pocket API Response', response)
      if (response.ok) {
        return response.json()
      } else {
        throw response
      }
    }).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    })
  })
}

export function getAuthorizePageUrl(requestToken, redirectUri) {
  const apiUrl = 'https://getpocket.com/auth/authorize'
  return `${apiUrl}?request_token=${requestToken}&redirect_uri=${redirectUri}`
}

export function add(consumerKey, accessToken, url) {
  return new Promise((resolve, reject) => {
    if (!(consumerKey && accessToken)) { reject() }
    fetch('https://getpocket.com/v3/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Accept': 'application/json',
      },
      body: JSON.stringify({
        consumer_key: consumerKey,
        access_token: accessToken,
        url: url,
      })
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw response
      }
    }).then((result) => {
      resolve(result)
    }).catch((error) => {
      throw error
    })
  })
}

export function get(consumerKey, accessToken, options) {
  console.tron.start('PocketAPI#get')
  const defaultParams = {
    consumer_key: consumerKey,
    access_token: accessToken,
  }
  const params = Object.assign({}, defaultParams, options)
  return new Promise((resolve, reject) => {
    if (!(consumerKey && accessToken)) { reject() }
    fetch('https://getpocket.com/v3/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Accept': 'application/json',
      },
      body: JSON.stringify(params)
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw response
      }
    }).then((result) => {
      console.tron.end('PocketAPI#get')
      resolve(result)
    }).catch((error) => {
      console.tron.error('PocketAPI#get', error)
      reject(error)
    })
  })
}

export function archive(consumerKey, accessToken, itemId) {
  return new Promise((resolve, reject) => {
    if (!(consumerKey && accessToken)) { reject() }
    console.tron.start('API#archive', {consumerKey, accessToken, itemId})
    let params = new URLSearchParams()
    params.append('consumer_key', consumerKey)
    params.append('access_token', accessToken)
    params.append('actions', `[{"action":"archive","item_id":${itemId}}]`)
    fetch(`https://getpocket.com/v3/send?${params.toString()}`, {
      method: 'GET',
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw response
      }
    }).then((result) => {
      console.tron.info('API#archive', result)
      resolve(result)
    }).catch((error) => {
      console.tron.error('API#archive', error)
      throw error
    })
  })
}

export function tags_add(consumerKey, accessToken, itemId, tag) {
  return new Promise((resolve, reject) => {
    if (!(consumerKey && accessToken)) { reject() }
    console.tron.start('API#tags_add', {consumerKey, accessToken, itemId, tag})
    let params = new URLSearchParams()
    params.append('consumer_key', consumerKey)
    params.append('access_token', accessToken)
    params.append('actions', `[{"action":"tags_add","item_id":${itemId},"tags":"${tag}"}]`)
    fetch(`https://getpocket.com/v3/send?${params.toString()}`, {
      method: 'GET',
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw response
      }
    }).then((result) => {
      console.tron.end('API#tags_add', result)
      resolve(result)
    }).catch((error) => {
      console.tron.error('API#tags_add', error)
      reject(error)
    })
  })
}
