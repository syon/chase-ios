const initialState = {
  allScenes: ['自宅', '職場', '暇つぶし'],
  currentIdx: 0,
}

export default function phase(state = initialState, action = {}) {
  switch (action.type) {
    case 'CHANGE_SCENE':
      return Object.assign({}, state, {
        currentIdx: action.sceneIdx
      })
    default:
      return state
  }
}
