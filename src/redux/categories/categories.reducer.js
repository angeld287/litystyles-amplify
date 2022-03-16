import { Types } from "./categories.types";
import { utilAddItem, utilRemoveItem, utilEditItem, getItem } from '../../utils/Items/Utils'

const INITIAL_STATES = {
    categories: [],
    category: {},
    nextToken: "",
}
const categoriesReducer = (state = INITIAL_STATES, action) => {
    switch (action.type) {
        case Types.ADD_ITEM:
            return {
                ...state,
                categories: utilAddItem(state.categories, action.payload)
            }
        case Types.REMOVE_ITEM:
            return {
                ...state,
                categories: utilRemoveItem(state.categories, action.payload)
            };
        case Types.EDIT_ITEM:
            return {
                ...state,
                categories: utilEditItem(state.categories, action.payload)
            };
        case Types.GET_ITEM:
            return {
                ...state,
                category: getItem(state.category, action.payload)
            };
        case Types.SET_ITEMS:
            return {
                ...state,
                categories: action.payload
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

export default categoriesReducer;