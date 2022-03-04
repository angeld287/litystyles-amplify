import { Types } from "./offices.types";
import { utilAddItem, utilRemoveItem, utilEditItem, getItem } from '../../utils/Items/Utils'

const INITIAL_STATES = {
    offices: [],
    office: {},
    nextToken: "",
}
const officesReducer = (state = INITIAL_STATES, action) => {
    switch (action.type) {
        case Types.ADD_ITEM:
            return {
                ...state,
                offices: utilAddItem(state.offices, action.payload)
            }
        case Types.REMOVE_ITEM:
            return {
                ...state,
                offices: utilRemoveItem(state.offices, action.payload)
            };
        case Types.EDIT_ITEM:
            return {
                ...state,
                offices: utilEditItem(state.offices, action.payload)
            };
        case Types.GET_ITEM:
            return {
                ...state,
                office: getItem(state.office, action.payload)
            };
        case Types.SET_ITEMS:
            return {
                ...state,
                offices: action.payload
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

export default officesReducer;