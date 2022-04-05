import { Types } from "./products.types";
import { utilAddItem, utilRemoveItem, utilEditItem, getItem } from '../../utils/Items/Utils'

const INITIAL_STATES = {
    companyProducts: [],
    companyProduct: {},
    companyHasProducts: true,
    products: [],
    nextToken: { productsNextToken: "", companyProductsNextToken: "" },
}
const productsReducer = (state = INITIAL_STATES, action) => {
    switch (action.type) {
        case Types.ADD_ITEM:
            return {
                ...state,
                companyProducts: utilAddItem(state.companyProducts, action.payload)
            }
        case Types.REMOVE_ITEM:
            return {
                ...state,
                companyProducts: utilRemoveItem(state.companyProducts, action.payload)
            };
        case Types.EDIT_ITEM:
            return {
                ...state,
                companyProducts: utilEditItem(state.companyProducts, action.payload)
            };
        case Types.GET_ITEM:
            return {
                ...state,
                companyProduct: getItem(state.companyProduct, action.payload)
            };
        case Types.SET_ITEMS:
            return {
                ...state,
                products: action.payload.products,
                companyProducts: action.payload.companyProducts,
                companyHasProducts: action.payload.companyHasProducts,
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

export default productsReducer;