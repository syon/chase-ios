import { combineReducers } from 'redux';

import phase from './phase'
import login from './login'
import shelf from './shelf'

const rootReducer = combineReducers({
  phase,
  login,
  shelf,
})

export default rootReducer
