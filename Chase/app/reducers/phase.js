const initialState = ''

export default function phase(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return 'PHASE_READY'
    case 'NEEDS_AUTH':
      return 'PHASE_NEEDS_AUTH'
    case 'LOGOUT_DONE':
      return 'PHASE_NEEDS_AUTH'
    default:
      return state
  }
}
