const initialState = {}

export default function work(state = initialState, action = {}) {
  switch (action.type) {
    case 'REFRESH_WORK': {
      return initialState
    }
    case 'SET_WORK_SCENE': {
      const itemId = action.itemId
      const item = state[action.itemId]
      const new_item = Object.assign({}, item, { [action.abc]: true })
      console.tron.info('work new_item', { [itemId]: new_item })
      return Object.assign({}, state, {
        [itemId]: new_item
      })
    }
    case 'SET_WORK_ARCHIVE': {
      const itemId = action.itemId
      const item = state[action.itemId]
      const new_item = Object.assign({}, item, { archive: true })
      console.tron.info('work new_item', { [itemId]: new_item })
      return Object.assign({}, state, {
        [itemId]: new_item
      })
    }
    case 'LOGOUT_DONE':
      return initialState
    default:
      return state
  }
}
