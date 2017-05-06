const initialState = {
  allScenes: ['シーンA', 'シーンB', 'シーンC'],
  currentIdx: 0,
}

export default function scene(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_SCENES':
      return Object.assign({}, state, {
        allScenes: action.scenes,
      })
    case 'CHANGE_SCENE':
      return Object.assign({}, state, {
        currentIdx: action.sceneIdx,
      })
    case 'LOGOUT_DONE':
      return initialState
    default:
      return state
  }
}
