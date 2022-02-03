const INITIAL_STATES = {
    currentScreen: 'HOME'
}
const communReducer = (state = INITIAL_STATES, action) => {
    switch (action.type) {
        case 'SET_CURRENT_SCREEN':
            return {
                ...state,
                currentScreen: action.payload
            }
        default:
            return state;
    }
}

export default communReducer;