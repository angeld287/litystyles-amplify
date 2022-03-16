import { Types } from './services.types'
import { utilAddItem, utilRemoveItem, utilEditItem, getItem } from '../../utils/Items/Utils'

const INITIAL_STATES = {
    companyServices: [],
    companyService: {},
    services: [],
    nextToken: { servicesNextToken: "", companyServicesNextToken: "" },
    companyServicesNextToken: null,
}
const servicesReducer = (state = INITIAL_STATES, action) => {
    switch (action.type) {
        case Types.ADD_ITEM:
            return {
                ...state,
                companyServices: utilAddItem(state.companyServices, action.payload)
            }
        case Types.REMOVE_ITEM:
            return {
                ...state,
                companyServices: utilRemoveItem(state.companyServices, action.payload)
            };
        case Types.EDIT_ITEM:
            return {
                ...state,
                companyServices: utilEditItem(state.companyServices, action.payload)
            };
        case Types.GET_ITEM:
            return {
                ...state,
                companyService: getItem(state.companyServices, action.payload)
            };
        case Types.SET_ITEMS:
            return {
                ...state,
                services: action.payload.services,
                companyServices: action.payload.companyServices
            }
        case Types.SET_COMPANY_SERVICES_ITEMS:
            return {
                ...state,
                companyServices: action.payload
            }
        case Types.SET_COMPANY_SERVICES_NEXT_TOKEN:
            return {
                ...state,
                companyServicesNextToken: action.payload
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

export default servicesReducer;