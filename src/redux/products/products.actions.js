import { Types } from "./products.types";

export const setCompanyProduct = companyProduct => ({
    type: Types.ADD_ITEM,
    payload: companyProduct
})

export const editCompanyProduct = companyProduct => ({
    type: Types.EDIT_ITEM,
    payload: companyProduct
})

export const removeCompanyProduct = companyProduct => ({
    type: Types.REMOVE_ITEM,
    payload: companyProduct
})

export const setItemsFromStore = (data) => {
    return {
        type: Types.SET_ITEMS,
        payload: { products: data.products, companyProducts: data.companyProducts, companyHasProducts: data.companyHasProducts }
    }
}

export const setNextToken = (token) => {
    return {
        type: Types.SET_NEXT_TOKEN,
        payload: token
    }
}