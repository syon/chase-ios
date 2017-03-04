import { Linking } from 'react-native';

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
      console.log(error)
    })
  })
}

export function checkPocketApiAuth(consumerKey, redirectUri, requestToken) {
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
      })
    }).then((response) => {
      console.log('Pocket API Response', response)
      if (response.ok) {
        return response.json()
      } else {
        reject(response)
      }
    }).then((result) => {
      resolve(result)
    }).catch((error) => {
      console.log("authorize error", error)
    })
  })
}

export function openAuthorizePage(requestToken, redirectUri) {
  const apiUrl = 'https://getpocket.com/auth/authorize'
  const url = `${apiUrl}?request_token=${requestToken}&redirect_uri=${redirectUri}`;
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url)
    } else {
      console.log('Don\'t know how to open URI: ' + url)
    }
  })
}

export function add(consumerKey, accessToken, url) {
  return new Promise((resolve, reject) => {
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

export function get(consumerKey, accessToken) {
  return new Promise((resolve, reject) => {
    fetch('https://getpocket.com/v3/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Accept': 'application/json',
      },
      body: JSON.stringify({
        consumer_key: consumerKey,
        access_token: accessToken,
        state: 'unread',
        count: 20,
        sort: 'newest',
        detailType: 'simple',
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
