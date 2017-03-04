const initialState = ''

export default function mode(state = initialState, action = {}) {
  console.log('Mode Reducer called.', action)
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return 'MODE_READY'
    case 'NEEDS_AUTH':
      return 'MODE_NEEDS_AUTH'
    case 'LOGOUT_DONE':
      return 'MODE_NEEDS_AUTH'
    default:
      return state
  }
}
