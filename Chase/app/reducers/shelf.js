const initialState = {
  catalogMain: {},
  catalogSceneA: {},
  catalogSceneB: {},
  catalogSceneC: {},
}

export default function (state = initialState, action = {}) {
  console.tron.display({
    name: 'Shelf Reducer',
    preview: action.type,
    value: action
  })
  switch (action.type) {
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
        catalogSceneA: action.catalog
      })
    case 'REFRESH_CATALOG_SCENE_C':
      return Object.assign({}, state, {
        catalogSceneA: action.catalog
      })
    case 'LOGOUT_DONE':
      return initialState
    default:
      return state
  }
}
