import { combineReducers } from 'redux';

import phase from './phase'
import login from './login'
import shelf from './shelf'
import scene from './scene'

const rootReducer = combineReducers({
  phase,
  login,
  shelf,
  scene,
})

export default rootReducer
