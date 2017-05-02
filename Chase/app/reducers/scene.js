const initialState = {
  allScenes: ['シーンA', 'シーンB', 'シーンC'],
  currentIdx: 0,
}

export default function phase(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_SCENES':
      state.allScenes = action.scenes
      return state
    case 'CHANGE_SCENE':
      return Object.assign({}, state, {
        currentIdx: action.sceneIdx
      })
    default:
      return state
  }
}
