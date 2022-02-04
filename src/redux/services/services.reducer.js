import { Types } from '../../utils/Items/Types'
import { utilAddItem } from '../../utils/Items/Utils'

const INITIAL_STATES = {
    services: [],
    service: {},
}
const servicesReducer = (state = INITIAL_STATES, action) => {
    switch (action.type) {
        case Types.ADD_ITEM:
            return {
                ...state,
                services: utilAddItem(state.services, action.payload)
            }
        case Types.REMOVE_ITEM:
            return {
                ...state,
                services: removeItem(state.services, action.payload)
            };
        case Types.EDIT_ITEM:
            return {
                ...state,
                services: utilEditItem(state.services, action.payload)
            };
        case Types.GET_ITEM:
            return {
                ...state,
                service: getItem(state.services, action.payload)
            };
        default:
            return state;
    }
}

export default servicesReducer;