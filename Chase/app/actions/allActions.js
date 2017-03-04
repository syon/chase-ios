import { CONSUMER_KEY, REDIRECT_URI } from 'react-native-dotenv'

import * as PocketAPI from '../PocketAPI'

export function loginFromStorage() {
  return function(dispatch, getState) {
    global.storage.load({
      key: 'loginState',
    }).then(ret => {
      dispatch({ type: 'LOGIN_SUCCESS', data: ret })
    }).catch(err => {
      console.warn('[Error Message from Storage]', err.message);
      switch (err.name) {
        case 'NotFoundError':
          break
        case 'ExpiredError':
          break
      }
    })
  }
}

export function connectToPocket() {
  return function(dispatch) {
    const promise = PocketAPI.getRequestToken(CONSUMER_KEY, REDIRECT_URI)
    promise.then((token) => {
      dispatch({ type: 'GOT_REQUEST_TOKEN', requestToken: token })
      PocketAPI.openAuthorizePage(token, REDIRECT_URI)
    })
  }
}

export function doAfterRedirect(eventUrl) {
  console.log('doAfterRedirect', eventUrl)
  return function(dispatch, getState) {
    if (eventUrl.match(/authorizationFinished/)) {
      const rt = getState().login.requestToken
      const promise = PocketAPI.checkPocketApiAuth(CONSUMER_KEY, REDIRECT_URI, rt)
      promise.then((result) => {
        const loginData = { username: result.username, accessToken: result.access_token }
        updateLoginData(loginData)
        dispatch({ type: 'LOGIN_SUCCESS', data: loginData })
      }).catch(result => {
        console.log('doAfterRedirect', 'Declined', result)
      })
    } else {
      console.log('doAfterRedirect', 'Unexpected', eventUrl)
    }
  }
}

function updateLoginData(loginData) {
  global.storage.save({
    key: 'loginState',
    rawData: { 
      username: loginData.username,
      accessToken: loginData.accessToken,
    },
    expires: null
  })
}

export function disconnectFromPocket() {
  return function(dispatch, getState) {
    global.storage.remove({
      key: 'loginState'
    })
    updateLoginData({})
    dispatch({ type: 'LOGOUT_DONE' })
  }
}

export function savePage(url) {
  return function(dispatch, getState) {
    const at = getState().pocket.accessToken
    const promise = PocketAPI.add(CONSUMER_KEY, at, url)
    promise.then((result) => {
      console.log(result)
      dispatch({ type: 'SAVE_PAGE', data: `SAVED! ${url}` })
    })
  }
}

export function loadPages() {
  return function(dispatch, getState) {
    const at = getState().login.accessToken
    const promise = PocketAPI.get(CONSUMER_KEY, at)
    promise.then((result) => {
      console.log(result)
      dispatch({ type: 'LOAD_PAGES', data: result })
    }).catch(result => {
      console.log('Failed to load pages.', result)
    })
  }
}
