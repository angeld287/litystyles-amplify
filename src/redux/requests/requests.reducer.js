import { Types } from "./requests.types";
import { utilAddItem, utilRemoveItem, utilEditItem, getItem } from '../../utils/Items/Utils'

const INITIAL_STATES = {
    requests: [],
    request: {},
    nextToken: "",
}
const requestsReducer = (state = INITIAL_STATES, action) => {
    switch (action.type) {
        case Types.ADD_ITEM:
            return {
                ...state,
                requests: utilAddItem(state.requests, action.payload)
            }
        case Types.REMOVE_ITEM:
            return {
                ...state,
                requests: utilRemoveItem(state.requests, action.payload)
            };
        case Types.EDIT_ITEM:
            return {
                ...state,
                requests: utilEditItem(state.requests, action.payload)
            };
        case Types.GET_ITEM:
            return {
                ...state,
                request: getItem(state.request, action.payload)
            };
        case Types.SET_ITEMS:
            return {
                ...state,
                requests: action.payload
            }
        case Types.SET_NEXT_TOKEN:
            return {
                ...state,
                nextToken: action.payload
            }
        default:
            return state;
    }
}

export default requestsReducer;