import { Types } from "./offices.types";
import { utilAddItem, utilRemoveItem, utilEditItem, getItem } from '../../utils/Items/Utils'

const INITIAL_STATES = {
    companyOffices: [],
    companyOffice: {},
    nextToken: "",
}
const officesReducer = (state = INITIAL_STATES, action) => {
    switch (action.type) {
        case Types.ADD_ITEM:
            return {
                ...state,
                companyOffices: utilAddItem(state.companyOffices, action.payload)
            }
        case Types.REMOVE_ITEM:
            return {
                ...state,
                companyOffices: utilRemoveItem(state.companyOffices, action.payload)
            };
        case Types.EDIT_ITEM:
            return {
                ...state,
                companyOffices: utilEditItem(state.companyOffices, action.payload)
            };
        case Types.GET_ITEM:
            return {
                ...state,
                companyOffices: getItem(state.companyOffices, action.payload)
            };
        case Types.SET_ITEMS:
            return {
                ...state,
                companyOffices: action.payload.companyOffices
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