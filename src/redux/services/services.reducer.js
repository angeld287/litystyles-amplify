import { Types } from '../../utils/Items/Types'
import { utilAddItem, utilRemoveItem, utilEditItem, getItem } from '../../utils/Items/Utils'

const INITIAL_STATES = {
    companyServices:
        [
            { name: 'Manicure', cost: '150', id: '1503d159-ad21-4aaa-ab44-06a9ebeccf04' },
            { name: 'Facial', cost: '150', id: '0e3821b2-972f-4272-8e3c-5eb4b283fa7a' },
        ],
    companyService: {},
    services: [
        { id: '1', name: 'Corte Completo con Facial' },
        { id: '2', name: 'Corte Completo sin Facial' }
    ],
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
                companyServices: action.payload
            }
        default:
            return state;
    }
}

export default servicesReducer;