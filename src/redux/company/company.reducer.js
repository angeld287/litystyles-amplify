import { Types } from './company.types'

const INITIAL_STATES = {
    company: null,
    nextToken: {},
}
const companyReducer = (state = INITIAL_STATES, action) => {
    switch (action.type) {
        case Types.SET_ITEM:
            return {
                ...state,
                company: action.payload
            }
        default:
            return state;
    }
}

export default companyReducer;