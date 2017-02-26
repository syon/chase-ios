const initialState = {
  itemList: {},
}

export default function items(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOAD_PAGES':
      console.log(action.type, action)
      return Object.assign({}, state, {
        itemList: action.data.list
      })
    default:
      return state
  }
}
