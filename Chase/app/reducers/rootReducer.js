import { combineReducers } from 'redux';

import phase from './phase'
import login from './login'
import shelf from './shelf'
import scene from './scene'
import tags from './tags'
import work from './work'
import pageinfo from './pageinfo'

const rootReducer = combineReducers({
  phase,
  login,
  shelf,
  scene,
  tags,
  work,
  pageinfo,
})

export default rootReducer
