import { CONSUMER_KEY, REDIRECT_URI } from 'react-native-dotenv'
import { Navigation } from 'react-native-navigation'

import * as PocketAPI from '../api/PocketAPI'
import * as Pocket from '../api/PocketAdapter'
import * as ChaseDriver from '../api/ChaseDriver'

let memAccessToken = null

export function ready() {
  return async function(dispatch, getState) {
    await _initialize(dispatch)
  }
}

async function _initialize(dispatch) {
  console.tron.log('Loading UserInfo...')
  try {
    await _loadUserInfo(dispatch)
  } catch (e) {
    showLoginScreen(dispatch)
    return
  }
  try {
    await _loadMainCatalog(dispatch)
    await _bumpAllTags(dispatch)
    _loadSceneCatalogA(dispatch)
    _loadSceneCatalogB(dispatch)
    _loadSceneCatalogC(dispatch)
  } catch (e) {
    console.tron.error(e)
    throw e
  }
}

async function _loadUserInfo(dispatch) {
  console.info('allActions#_loadUserInfo')
  await global.storage.load({ key: 'loginState' }).then(user => {
    console.tron.display({ name: 'user', value: user })
    memAccessToken = user.accessToken
    Pocket.setAccessToken(user.accessToken)
    dispatch({ type: 'LOGIN_SUCCESS', data: user })
    return
  }).catch(e => {
    switch (e.name) {
      case 'NotFoundError':
        break
      default:
        console.tron.error('#_loadUserInfo', e)
        throw e
    }
  })
}

async function _loadMainCatalog(dispatch) {
  _refreshInboxCatalog(dispatch)
}

export function loginFromStorage() {
  return function(dispatch, getState) {
    return new Promise((resolve, reject) => {
      global.storage.load({
        key: 'loginState',
      }).then(ret => {
        memAccessToken = ret.accessToken
        dispatch({ type: 'LOGIN_SUCCESS', data: ret })
        resolve()
      }).catch(err => {
        showLoginScreen(dispatch)
        console.warn('[Error Message from Storage]', err);
        switch (err.name) {
          case 'NotFoundError':
            break
          case 'ExpiredError':
            break
        }
      })
    })
  }
}

function showLoginScreen(dispatch) {
  dispatch({ type: 'NEEDS_AUTH' })
  Navigation.showModal({
    screen: "Chase.LoginScreen", // unique ID registered with Navigation.registerScreen
    title: "Modal", // title of the screen as appears in the nav bar (optional)
    passProps: {}, // simple serializable object that will pass as props to the modal (optional)
    navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
    animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
  })
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
      console.tron.info('#doAfterRedirect - Dismiss', eventUrl)
      Navigation.dismissAllModals({
        animationType: 'slide-down'
      })
      const rt = getState().login.requestToken
      const promise = PocketAPI.checkPocketApiAuth(CONSUMER_KEY, REDIRECT_URI, rt)
      promise.then((result) => {
        const loginData = { username: result.username, accessToken: result.access_token }
        updateLoginData(loginData)
        _initialize(dispatch)
      }).catch(result => {
        console.tron.info('#doAfterRedirect - Declined', result)
      })
    } else {
      console.tron.error('#doAfterRedirect - Unexpected', eventUrl)
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
    global.storage.remove({ key: 'loginState' })
    updateLoginData({})
    dispatch({ type: 'LOGOUT_DONE' })
    showLoginScreen(dispatch)
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

export function loadCatalogFromStorage(catalogId) {
  return function(dispatch, getState) {
    return new Promise((resolve, reject) => {
      global.storage.load({
        key: catalogId,
      }).then(catalog => {
        switch(catalogId) {
          case('catalogMain'):
            dispatch({ type: 'REFRESH_CATALOG_MAIN', catalog })
            break
          case('catalogSceneA'):
            dispatch({ type: 'REFRESH_CATALOG_SCENE_A', catalog })
            break
          case('catalogSceneB'):
            dispatch({ type: 'REFRESH_CATALOG_SCENE_B', catalog })
            break
          case('catalogSceneC'):
            dispatch({ type: 'REFRESH_CATALOG_SCENE_C', catalog })
            break
        }
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export function refreshCatalog(catalogId) {
  return function(dispatch, getState) {
    _refreshInboxCatalog(dispatch)
  }
}

function _refreshInboxCatalog(dispatch) {
  return new Promise((resolve, reject) => {
    console.tron.info('allActions#_refreshInboxCatalog')
    dispatch({ type: 'REFRESH_WORK' })
    Pocket.getAllUntaggedItems().then((result) => {
      const catalog = ChaseDriver.makeCatalog(result.list)
      dispatch({ type: 'REFRESH_CATALOG_MAIN', catalog })
      ChaseDriver.saveCatalogItemsAsEntryToStorage(catalog)
        .then(entries => {
          dispatch({ type: 'REFRESH_ENTRIES', entries })
        })
      resolve(catalog)
    }).catch(e => {
      console.tron.error('allActions#_refreshInboxCatalog', e)
    })
  })
}

export function refreshSceneCatalogs() {
  return function(dispatch, getState) {
    return new Promise((resolve, reject) => {
      console.tron.info('allActions#refreshSceneCatalogs', getState)
      _loadSceneCatalogA(dispatch)
      _loadSceneCatalogB(dispatch)
      _loadSceneCatalogC(dispatch)
      resolve()
    })
  }
}

function _loadSceneCatalogA(dispatch) {
  Pocket.getItemsTaggedBy('chase:a').then((result) => {
    const catalog = ChaseDriver.makeCatalog(result.list)
    console.tron.info('allActions#_loadSceneCatalogA', catalog)
    dispatch({ type: 'REFRESH_CATALOG_SCENE_A', catalog })
  })
}

function _loadSceneCatalogB(dispatch) {
  Pocket.getItemsTaggedBy('chase:b').then((result) => {
    const catalog = ChaseDriver.makeCatalog(result.list)
    console.tron.info('allActions#_loadSceneCatalogB', catalog)
    dispatch({ type: 'REFRESH_CATALOG_SCENE_B', catalog })
  })
}

function _loadSceneCatalogC(dispatch) {
  Pocket.getItemsTaggedBy('chase:c').then((result) => {
    const catalog = ChaseDriver.makeCatalog(result.list)
    console.tron.info('allActions#_loadSceneCatalogC', catalog)
    dispatch({ type: 'REFRESH_CATALOG_SCENE_C', catalog })
  })
}

export function refreshTagCatalog(tagNm) {
  return function(dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch({ type: 'REFRESH_CATALOG_TAG', catalog: null })
      console.tron.log('allActions#refreshTagCatalog')
      console.tron.display({ name: 'allActions', preview: 'getState()', value: getState() })
      Pocket.getItemsTaggedBy(tagNm).then((result) => {
        const catalog = ChaseDriver.makeCatalog(result.list)
        dispatch({ type: 'REFRESH_CATALOG_TAG', catalog })
      })
      resolve()
    })
  }
}

export function applyScene(itemId, abc) {
  return function(dispatch, getState) {
    console.tron.info('allActions#applyScene', {itemId, abc})
    const at = memAccessToken
    const promise = PocketAPI.tags_add(CONSUMER_KEY, at, itemId, `chase:${abc}`)
    promise.then((result) => {
      if (result.action_results) {
        console.tron.info('allActions#applyScene', result)
        dispatch({ type: 'SET_WORK_SCENE', itemId, abc })
      }
    }).catch(err => {
      console.tron.error('allActions#applyScene', err)
    })
  }
}

export function addTag(itemId, tagNm) {
  return function(dispatch, getState) {
    console.log('タグ付けします...', itemId);
    const at = memAccessToken
    const promise = PocketAPI.tags_add(CONSUMER_KEY, at, itemId, tagNm)
    promise.then((result) => {
      if (result.action_results) {
        console.tron.log('allActions#addTag - Success')
        console.info('Success: Add Tag', itemId);
      }
    }).catch(err => {
      console.tron.error('allActions#addTag - Error')
      console.error(err)
    })
  }
}

export function archive(itemId) {
  return function(dispatch, getState) {
    dispatch({ type: 'SET_WORK_ARCHIVE', itemId })
    const at = memAccessToken
    const promise = PocketAPI.archive(CONSUMER_KEY, at, itemId)
    promise.then((result) => {
      if (result.action_results) {
        console.tron.log('allActions#archive - Success')
      }
    }).catch(err => {
      console.tron.error('allActions#archive - Error', err)
      console.error(err)
    })
  }
}

export function testPocketAdapter() {
  return function(dispatch, getState) {
    console.log('testPocketAdapter...');
    const result = Pocket.getAllTags()
    console.info('result', result);
  }
}

export function changeScene(idx) {
  return function(dispatch, getState) {
    dispatch({ type: 'CHANGE_SCENE', sceneIdx: idx })
  }
}

export function refreshAllTags() {
  return async function(dispatch, getState) {
    await _bumpAllTags(dispatch)
  }
}

async function _bumpAllTags(dispatch) {
  const tags = await Pocket.getAllTags()
  dispatch({ type: 'REFRESH_TAGS', tags })
}
