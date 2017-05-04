const initialState = {}

export default function tags(state = initialState, action = {}) {
  switch (action.type) {
    case 'REFRESH_TAGS':
      return action.tags
    case 'LOGOUT_DONE':
      return initialState
    default:
      return state
  }
}
