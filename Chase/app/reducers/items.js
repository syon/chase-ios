const initialState = {
  catalog: {},
}

export default function items(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOAD_PAGES':
      console.log(action.type, action)
      const catalog = makeCatalog(action.data.list)
      saveCatalog(catalog)
      return Object.assign({}, state, {
        catalog: catalog
      })
    default:
      return state
  }
}

function makeCatalog(listFromPocket) {
  let catalog = {}
  Object.keys(listFromPocket).forEach(function(key) {
    const m = listFromPocket[key]
    const title = m.resolved_title ? m.resolved_title : m.given_title
    const url = m.resolved_url ? m.resolved_url : m.given_url
    catalog[key] = { title, url }
  })
  return catalog
}

function saveCatalog(catalog) {
  global.storage.save({
    key: 'catalog',
    rawData: catalog,
    expires: null
  })
}
