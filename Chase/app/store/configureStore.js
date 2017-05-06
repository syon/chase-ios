import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers/rootReducer'

const middleware = [thunk]

export default function configureStore() {
  const mw = applyMiddleware(...middleware)
  const store = createStore(rootReducer, compose(mw))
  return store
}
