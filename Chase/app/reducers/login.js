const initialState = {
  requestToken: null,
  username: null,
  accessToken: null,
}

export default function login(state = initialState, action = {}) {
  switch (action.type) {
    case 'GOT_REQUEST_TOKEN':
      return Object.assign({}, state, {
        requestToken: action.requestToken,
      })
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        username: action.data.username,
        accessToken: action.data.accessToken,
      })
    case 'LOGOUT_DONE':
      return initialState
    default:
      return state
  }
}
