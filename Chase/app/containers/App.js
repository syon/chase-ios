import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import ChaseApp from './ChaseApp';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

let unsubscribe = store.subscribe(() => {
  console.log('[App.js] getState', store.getState())
})

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ChaseApp />
      </Provider>
    );
  }
}
