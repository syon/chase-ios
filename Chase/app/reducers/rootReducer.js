import { combineReducers } from 'redux';

import mode from './mode'
import login from './login'
import items from './items'
import shelf from './shelf'

const rootReducer = combineReducers({
  mode,
  login,
  items,
  shelf,
})

export default rootReducer
