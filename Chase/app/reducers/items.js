const initialState = {
  itemList: {},
}

export default function items(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOAD_PAGES':
      console.log(action.type, action)
      saveCatalog(action.data.list)
      return Object.assign({}, state, {
        itemList: action.data.list
      })
    default:
      return state
  }
}

function saveCatalog(listFromPocket) {
  global.storage.save({
    key: 'catalog',
    rawData: listFromPocket,
    expires: null
  })
}
