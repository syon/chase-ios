import { CONSUMER_KEY, REDIRECT_URI } from 'react-native-dotenv'

const initialState = {
  requestToken: null,
  username: null,
  accessToken: null,
}

export default function login(state = initialState, action = {}) {
  console.log('Login Reducer called.', action)
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
    default:
      return state
  }
}
