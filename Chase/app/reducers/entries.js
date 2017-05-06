const initialState = {}

export default function entries(state = initialState, action = {}) {
  switch (action.type) {
    case 'CLEAR_ENTRIES': {
      return initialState
    }
    case 'REFRESH_ENTRIES': {
      const newEntries = Object.assign({}, state, action.entries)
      return newEntries
    }
    case 'LOGOUT_DONE':
      return initialState
    default:
      return state
  }
}
