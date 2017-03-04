import { CONSUMER_KEY, REDIRECT_URI } from 'react-native-dotenv'

const initialState = {
  requestToken: null,
}

export default function pocket(state = initialState, action = {}) {
  switch (action.type) {
    case 'GET_REQUEST_TOKEN':
      return Object.assign({}, state, {
        requestToken: action.requestToken,
      })
    default:
      return state
  }
}
