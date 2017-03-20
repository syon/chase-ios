import { combineReducers } from 'redux';

import mode from './mode'
import login from './login'
import shelf from './shelf'

const rootReducer = combineReducers({
  mode,
  login,
  shelf,
})

export default rootReducer
