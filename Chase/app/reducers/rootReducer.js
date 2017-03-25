import { combineReducers } from 'redux';

import phase from './phase'
import login from './login'
import shelf from './shelf'
import scene from './scene'
import tags from './tags'

const rootReducer = combineReducers({
  phase,
  login,
  shelf,
  scene,
  tags,
})

export default rootReducer
