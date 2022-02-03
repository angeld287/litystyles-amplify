const INITIAL_STATES = {
    currentUser: null
}
const userReducer = (state = INITIAL_STATES, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;