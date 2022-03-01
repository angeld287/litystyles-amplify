import { Types } from './commun.types'

const INITIAL_STATES = {
    currentScreen: 'COMPANY_ADMIN',
    loadingScreen: false
};

const communReducer = (state = INITIAL_STATES, action) => {
    switch (action.type) {
        case Types.SET_CURRENT_SCREEN:
            return {
                ...state,
                currentScreen: action.payload
            }
        case Types.SET_LOADING_SCREEN:
            return {
                ...state,
                loadingScreen: action.payload
            }
        default:
            return state;
    }
}

export default communReducer;