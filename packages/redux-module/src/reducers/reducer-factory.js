export const createReducerFactory = (handlers, initialState = {}) => (
    state = initialState,
    action
  ) => {
    const handler = handlers[action.type]
    if (!handler) {
      console.log(`Unknown action type: ${action.type}`);
      return state;
    }
    console.log("===============",action)
    const nextState = handler(state, action)
    return nextState
}