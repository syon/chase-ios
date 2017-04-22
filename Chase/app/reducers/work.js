const initialState = {}

export default function work(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_WORK_SCENE':
      const itemId = action.itemId
      const item = state[action.itemId]
      const new_item = Object.assign({}, item, { [action.abc]: true })
      console.tron.info('work new_item', { [itemId]: new_item })
      return Object.assign({}, state, {
        [itemId]: new_item
      })
    default:
      return state
  }
}
