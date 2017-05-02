const initialState = {}

export default function entries(state = initialState, action = {}) {
  switch (action.type) {
    case 'REFRESH_ENTRIES': {
      const newEntries = Object.assign({}, state, action.entries)
      return newEntries
    }
    default:
      return state
  }
}
