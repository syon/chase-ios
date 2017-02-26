import { CONSUMER_KEY, REDIRECT_URI } from 'react-native-dotenv'

import { getRequestToken, checkPocketApiAuth, add, get } from '../PocketAPI';

export function getReqToken() {
  return function(dispatch) {
    const promise = getRequestToken(CONSUMER_KEY, REDIRECT_URI)
    promise.then((token) => {
      dispatch({ type: 'GET_REQUEST_TOKEN', requestToken: token });
    })
  }
}

export function openAuthPage() {
  return function(dispatch, getState) {
    const rt = getState().pocket.requestToken
    const promise = checkPocketApiAuth(CONSUMER_KEY, REDIRECT_URI, rt)
    promise.then((result) => {
      //
    })
  }
}

export function getAccessToken() {
  return function(dispatch, getState) {
    const rt = getState().pocket.requestToken
    const promise = checkPocketApiAuth(CONSUMER_KEY, REDIRECT_URI, rt)
    promise.then((result) => {
      dispatch({ type: 'GET_ACCESS_TOKEN', data: result })
    })
  }
}

export function savePage(url) {
  return function(dispatch, getState) {
    const at = getState().pocket.accessToken
    const promise = add(CONSUMER_KEY, at, url)
    promise.then((result) => {
      console.log(result)
      dispatch({ type: 'SAVE_PAGE', data: `SAVED! ${url}` })
    })
  }
}

export function loadPages() {
  return function(dispatch, getState) {
    const at = getState().pocket.accessToken
    const promise = get(CONSUMER_KEY, at)
    promise.then((result) => {
      console.log(result)
      dispatch({ type: 'LOAD_PAGES', data: result })
    })
  }
}
