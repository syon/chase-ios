const initialState = {
  catalog: {},
}

export default function items(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOAD_PAGES':
      // console.log(action.type, action)
      return Object.assign({}, state, {
        catalog: action.catalog
      })
    default:
      return state
  }
}
