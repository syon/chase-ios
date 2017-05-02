const initialState = {}

export default function work(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_PAGEINFO': {
      const itemId = action.itemId
      const pageinfo = action.pageinfo
      return Object.assign({}, state, {
        [itemId]: pageinfo
      })
    }
    default:
      return state
  }
}
