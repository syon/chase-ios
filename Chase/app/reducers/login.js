import { CONSUMER_KEY, REDIRECT_URI } from 'react-native-dotenv'

const initialState = {
  username: null,
  accessToken: null,
}

export default function login(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        username: action.data.username,
        accessToken: action.data.accessToken,
      })
    default:
      return state
  }
}
