import { CONSUMER_KEY, REDIRECT_URI } from 'react-native-dotenv'

const initialState = {
  authed: false,
  requestToken: null,
  accessToken: null,
  username: null,
}

export default function pocket(state = initialState, action = {}) {
  console.log('PocketReducer called.', action)
  switch (action.type) {
    case 'GET_REQUEST_TOKEN':
      return Object.assign({}, state, {
        requestToken: action.requestToken,
      })
    case 'GET_ACCESS_TOKEN':
      console.log('GET_ACCESS_TOKEN', action)
      return Object.assign({}, state, {
        authed: true,
        accessToken: action.data.access_token,
        username: action.data.username,
      })
    default:
      return state
  }
}
