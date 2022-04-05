import { Types } from "./types.types";
import { utilAddItem, utilRemoveItem, utilEditItem, getItem } from '../../utils/Items/Utils'

const INITIAL_STATES = {
    types: [],
    type: {},
    nextToken: "",
}
const typesReducer = (state = INITIAL_STATES, action) => {
    switch (action.type) {
        case Types.ADD_ITEM:
            return {
                ...state,
                types: utilAddItem(state.types, action.payload)
            }
        case Types.REMOVE_ITEM:
            return {
                ...state,
                types: utilRemoveItem(state.types, action.payload)
            };
        case Types.EDIT_ITEM:
            return {
                ...state,
                types: utilEditItem(state.types, action.payload)
            };
        case Types.GET_ITEM:
            return {
                ...state,
                type: getItem(state.type, action.payload)
            };
        case Types.SET_ITEMS:
            return {
                ...state,
                types: action.payload
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

export default typesReducer;