import { Linking } from 'react-native';

export async function getRequestToken(consumerKey, redirectUri) {
  const token = await fetch('https://getpocket.com/v3/oauth/request', {
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
    return json.code
  })
  return token
}

export async function checkPocketApiAuth(consumerKey, redirectUri, requestToken) {
  const result = await fetch('https://getpocket.com/v3/oauth/authorize', {
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
    if (response.ok) {
      return response.json()
    } else {
      console.log(response.status)
      // throw response
      openAuthorizePage(requestToken, redirectUri)
    }
  }).then((json) => {
    return json
  }).catch((error) => {
    console.log("authorize error", error);
  });
  return result
}

export function openAuthorizePage(requestToken, redirectUri) {
  const apiUrl = 'https://getpocket.com/auth/authorize'
  const url = `${apiUrl}?request_token=${requestToken}&redirect_uri=${redirectUri}`;
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log('Don\'t know how to open URI: ' + url);
    }
  });
}

export function add(consumerKey, accessToken, url) {
  console.log("Trying ADD...", consumerKey, accessToken, url)
  fetch('https://getpocket.com/v3/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'X-Accept': 'application/json',
    },
    body: JSON.stringify({
      url: url,
      consumer_key: consumerKey,
      access_token: accessToken,
    })
  }).then((response) => {
    if (response.ok) {
      console.log('★★★ Success Add')
      response.json().then(function(d){
        console.log('[Request Token]', d)
      })
    } else {
      console.log('★★★ Failure Add')
      console.log(response.status)
    }
  })
}
