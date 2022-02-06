import { Types } from '../../utils/Items/Types'

const INITIAL_STATES = {
    company: { id: "acdf97db-9126-46a5-8371-8f04d08c3018" },
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