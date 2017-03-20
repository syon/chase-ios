/* https://github.com/infinitered/reactotron/blob/master/packages/demo-react-native/App/Redux/index.js */
import Reactotron from 'reactotron-react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'
let middleware = [thunk]

export default function configureStore(initialState) {
  const mw = applyMiddleware(...middleware)
  const store = Reactotron.createStore(rootReducer, compose(mw))
  return store
}
