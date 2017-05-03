const initialState = {
  catalogMain: {},
  catalogSceneA: {},
  catalogSceneB: {},
  catalogSceneC: {},
  catalogTag: {},
}

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case 'CLEAR_ALL_CATALOGS':
      return initialState
    case 'REFRESH_CATALOG_MAIN':
      return Object.assign({}, state, {
        catalogMain: action.catalog
      })
    case 'REFRESH_CATALOG_SCENE_A':
      return Object.assign({}, state, {
        catalogSceneA: action.catalog
      })
    case 'REFRESH_CATALOG_SCENE_B':
      return Object.assign({}, state, {
        catalogSceneB: action.catalog
      })
    case 'REFRESH_CATALOG_SCENE_C':
      return Object.assign({}, state, {
        catalogSceneC: action.catalog
      })
    case 'REFRESH_CATALOG_TAG':
      return Object.assign({}, state, {
        catalogTag: action.catalog
      })
    case 'LOGOUT_DONE':
      return initialState
    default:
      return state
  }
}
