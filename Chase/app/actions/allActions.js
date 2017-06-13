import { Navigation } from 'react-native-navigation'
import SafariView from 'react-native-safari-view'

import * as Pocket from '../api/PocketAdapter'
import * as ChaseDriver from '../api/ChaseDriver'

export function ready() {
  return async function(dispatch, getState) {
    await _initialize(dispatch)
  }
}

async function _initialize(dispatch) {
  console.tron.start('allActions#_initialize')
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
    console.tron.warn('allActions#_initialize', e)
  }
  console.tron.end('allActions#_initialize')
}

async function _loadUserInfo(dispatch) {
  console.info('allActions#_loadUserInfo')
  await global.storage.load({ key: 'loginState' }).then(user => {
    console.tron.info('user', user )
    Pocket.setAccessToken(user.accessToken)
    dispatch({ type: 'LOGIN_SUCCESS', data: user })
    return
  }).catch(e => {
    console.tron.info('allActions#_loadUserInfo', 'NEEDS_AUTH')
    throw e
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
    screen: 'Chase.LoginScreen',
    animationType: 'slide-up',
    navigatorStyle: {
      navBarHidden: true,
    },
  })
}

export function getPocketAuthUrl() {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      Pocket.getRequestToken()
        .then(token => {
          // Request token will be used on Pocket.checkPocketApiAuth
          dispatch({ type: 'GOT_REQUEST_TOKEN', requestToken: token })
          return Pocket.getAuthorizePageUrl(token)
        })
        .then(authUrl => resolve(authUrl))
    })
  }
}

export function doAfterRedirect(eventUrl) {
  return function(dispatch, getState) {
    console.tron.start('#doAfterRedirect', eventUrl)
    if (eventUrl.match(/authorizationFinished/)) {
      SafariView.dismiss()
      const rt = getState().login.requestToken
      Pocket.checkPocketApiAuth(rt)
        .then(res => {
          const loginData = { username: res.username, accessToken: res.access_token }
          updateLoginData(loginData)
          _initialize(dispatch)
        }).catch(err => {
          console.tron.warn('#doAfterRedirect - Declined', err)
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
    global.storage.remove({ key: 'scenes' })
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
    dispatch({ type: 'CLEAR_ALL_CATALOGS' })
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
      const { catalog, rawItems } = ChaseDriver.makeCatalog(result.list)
      dispatch({ type: 'REFRESH_CATALOG_MAIN', catalog })
      ChaseDriver.saveCatalogItemsAsEntryToStorage(rawItems)
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
    const { catalog, rawItems } = ChaseDriver.makeSceneCatalog(result.list)
    // console.tron.info('allActions#_loadSceneCatalogA', catalog)
    dispatch({ type: 'REFRESH_WORK' })
    dispatch({ type: 'REFRESH_CATALOG_SCENE_A', catalog })
    ChaseDriver.saveCatalogItemsAsEntryToStorage(rawItems)
      .then(entries => {
        dispatch({ type: 'REFRESH_ENTRIES', entries })
      })
  })
}

function _loadSceneCatalogB(dispatch) {
  Pocket.getItemsTaggedBy('chase:b').then((result) => {
    const { catalog, rawItems } = ChaseDriver.makeSceneCatalog(result.list)
    // console.tron.info('allActions#_loadSceneCatalogB', catalog)
    dispatch({ type: 'REFRESH_WORK' })
    dispatch({ type: 'REFRESH_CATALOG_SCENE_B', catalog })
    ChaseDriver.saveCatalogItemsAsEntryToStorage(rawItems)
      .then(entries => {
        dispatch({ type: 'REFRESH_ENTRIES', entries })
      })
  })
}

function _loadSceneCatalogC(dispatch) {
  Pocket.getItemsTaggedBy('chase:c').then((result) => {
    const { catalog, rawItems } = ChaseDriver.makeSceneCatalog(result.list)
    // console.tron.info('allActions#_loadSceneCatalogC', catalog)
    dispatch({ type: 'REFRESH_WORK' })
    dispatch({ type: 'REFRESH_CATALOG_SCENE_C', catalog })
    ChaseDriver.saveCatalogItemsAsEntryToStorage(rawItems)
      .then(entries => {
        dispatch({ type: 'REFRESH_ENTRIES', entries })
      })
  })
}

export function refreshTagCatalog(tagNm) {
  return function(dispatch, getState) {
    return new Promise((resolve, reject) => {
      console.tron.info('allActions#refreshTagCatalog -- start')
      dispatch({ type: 'REFRESH_WORK' })
      dispatch({ type: 'REFRESH_CATALOG_TAG', catalog: null })
      Pocket.getItemsTaggedBy(tagNm).then((result) => {
        const { catalog, rawItems } = ChaseDriver.makeCatalog(result.list)
        dispatch({ type: 'REFRESH_CATALOG_TAG', catalog })
        console.tron.info('allActions#refreshTagCatalog -- catalog:', catalog)
        ChaseDriver.saveCatalogItemsAsEntryToStorage(rawItems)
          .then(entries => {
            dispatch({ type: 'REFRESH_ENTRIES', entries })
            console.tron.info('allActions#refreshTagCatalog -- done', entries)
          })
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
      const suggested = entry.suggested
      ChaseDriver.callLambdaThumb(url, pocket_id, suggested).then(() => {
        resolve()
      })
    })
  }
}

export function applyScene(itemId, abc) {
  return async function(dispatch, getState) {
    await Pocket.addTag(itemId, `chase:${abc}`)
    dispatch({ type: 'SET_WORK_SCENE', itemId, abc })

    /* update one entry with new tag */
    const tagName = `chase:${abc}`
    let entries = Object.assign({}, getState().entries)
    let entry = Object.assign({}, entries[itemId])
    entry.tags = Object.assign({}, entry.tags, { [tagName]: {tag: tagName} })
    entries[itemId] = entry
    dispatch({ type: 'REFRESH_ENTRIES', entries })
  }
}

export function addTag({ itemId, tagNm }) {
  return async function(dispatch, getState) {
    await Pocket.addTag(itemId, tagNm)
    return tagNm
  }
}

export function archive(itemId) {
  return async function(dispatch, getState) {
    dispatch({ type: 'SET_WORK_ARCHIVE', itemId })
    await Pocket.archive(itemId)
    return itemId
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
