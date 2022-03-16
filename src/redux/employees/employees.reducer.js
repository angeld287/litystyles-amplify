import { Types } from "./employees.types";
import { utilAddItem, utilRemoveItem, utilEditItem, getItem } from '../../utils/Items/Utils'

const INITIAL_STATES = {
    employees: [],
    employee: {},
    nextToken: "",
}
const employeesReducer = (state = INITIAL_STATES, action) => {
    switch (action.type) {
        case Types.ADD_ITEM:
            return {
                ...state,
                employees: utilAddItem(state.employees, action.payload)
            }
        case Types.REMOVE_ITEM:
            return {
                ...state,
                employees: utilRemoveItem(state.employees, action.payload)
            };
        case Types.EDIT_ITEM:
            return {
                ...state,
                employees: utilEditItem(state.employees, action.payload)
            };
        case Types.GET_ITEM:
            return {
                ...state,
                employee: getItem(state.employees, action.payload)
            };
        case Types.SET_ITEMS:
            return {
                ...state,
                employees: action.payload
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

export default employeesReducer;