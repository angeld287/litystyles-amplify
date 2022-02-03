const INITIAL_STATES = {
    currentScreen: 'HOME',
    loadingScreen: false
}
const communReducer = (state = INITIAL_STATES, action) => {
    switch (action.type) {
        case 'SET_CURRENT_SCREEN':
            return {
                ...state,
                currentScreen: action.payload
            }
        case 'SET_LOADING_SCREEN':
            return {
                ...state,
                loadingScreen: action.payload
            }
        default:
            return state;
    }
}

export default communReducer;