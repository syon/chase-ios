const initialState = { authed: false }

export default function pocket(state = initialState, action = {}) {
  console.log('PocketReducer called.', action)
  switch (action.type) {
    case 'GO_AHEAD':
      return Object.assign({}, state, {
        authed: true,
      })
    default:
      return state
  }
}
