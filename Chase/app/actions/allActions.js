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
    _loadSceneText(dispatch)
  } catch (e) {
    console.tron.error('allActions#_initialize', e)
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
    data: { 
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

export function clearCatalogCache() {
  return function(dispatch, getState) {
    global.storage.remove({ key: 'entries' })
    global.storage.remove({ key: 'thumbs' })
    dispatch({ type: 'CLEAR_ENTRIES' })
  }
}

export function setScenes(scenes) {
  return function(dispatch) {
    dispatch({ type: 'SET_SCENES', scenes })
    global.storage.save({ key: 'scenes', data: scenes, expires: null })
  }
}

function _loadSceneText(dispatch) {
  global.storage.load({
    key: 'scenes',
  }).then(scenes => {
    dispatch({ type: 'SET_SCENES', scenes })
  }).catch(e => {
    switch (e.name) {
      case 'NotFoundError':
        break
      default:
    }
  })
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
    ChaseDriver.saveCatalogItemsAsEntryToStorage(catalog)
      .then(entries => {
        dispatch({ type: 'REFRESH_ENTRIES', entries })
      })
  })
}

function _loadSceneCatalogB(dispatch) {
  Pocket.getItemsTaggedBy('chase:b').then((result) => {
    const catalog = ChaseDriver.makeCatalog(result.list)
    console.tron.info('allActions#_loadSceneCatalogB', catalog)
    dispatch({ type: 'REFRESH_CATALOG_SCENE_B', catalog })
    ChaseDriver.saveCatalogItemsAsEntryToStorage(catalog)
      .then(entries => {
        dispatch({ type: 'REFRESH_ENTRIES', entries })
      })
  })
}

function _loadSceneCatalogC(dispatch) {
  Pocket.getItemsTaggedBy('chase:c').then((result) => {
    const catalog = ChaseDriver.makeCatalog(result.list)
    console.tron.info('allActions#_loadSceneCatalogC', catalog)
    dispatch({ type: 'REFRESH_CATALOG_SCENE_C', catalog })
    ChaseDriver.saveCatalogItemsAsEntryToStorage(catalog)
      .then(entries => {
        dispatch({ type: 'REFRESH_ENTRIES', entries })
      })
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

export function makeNewThumb(entry) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      const url = entry.url
      const pocket_id = entry.eid
      ChaseDriver.callLambdaThumb(url, pocket_id).then(() => {
        resolve()
      })
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
    return new Promise((resolve, reject) => {
      dispatch({ type: 'SET_WORK_ARCHIVE', itemId })
      const at = memAccessToken
      const promise = PocketAPI.archive(CONSUMER_KEY, at, itemId)
      promise.then((result) => {
        if (result.action_results) {
          console.tron.log('allActions#archive - Success')
          resolve()
        }
      }).catch(err => {
        console.tron.error('allActions#archive - Error', err)
        reject(err)
      })
    })
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

export function debugInfo() {
  return async function(dispatch, getState) {
    console.tron.log('== DEBUG INFO ===============================')
    await _dumpReducers(getState())
    console.tron.log('- - - - - - - - - - - - - - - - - - - - - - -')
    await _dumpStorages()
    console.tron.log('=============================================')
  }
}

async function _dumpReducers(allState) {
  Object.keys(allState).forEach(key => {
    console.tron.info(`Reducers[${key}]:`, allState[key])
  })
}

async function _dumpStorages() {
  await global.storage.load({ key: 'loginState' }).then(data => {
    console.tron.info('Storages -- loginState:', data)
  }).catch(e => { console.tron.info('Storage Load Error:', 'loginState') })
  await global.storage.load({ key: 'entries' }).then(data => {
    console.tron.info('Storages -- entries:', data)
  }).catch(e => { console.tron.info('Storage Load Error:', 'entries') })
  await global.storage.load({ key: 'scenes' }).then(data => {
    console.tron.info('Storages -- scenes:', data)
  }).catch(e => { console.tron.info('Storage Load Error:', 'scenes') })
}
