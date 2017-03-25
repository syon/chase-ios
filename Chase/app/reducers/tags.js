const initialState = {}

export default function tags(state = initialState, action = {}) {
  switch (action.type) {
    case 'REFRESH_TAGS':
      return action.tags
    default:
      return state
  }
}
