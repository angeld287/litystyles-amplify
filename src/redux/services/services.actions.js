import { Types } from "../../utils/Items/Types";

export const setCompanyService = companyService => ({
    type: Types.ADD_ITEM,
    payload: companyService
})

export const editCompanyService = companyService => ({
    type: Types.EDIT_ITEM,
    payload: companyService
})

export const removeCompanyService = companyService => ({
    type: Types.REMOVE_ITEM,
    payload: companyService
})

export const setItemsFromStore = (data) => {
    return {
        type: Types.SET_ITEMS,
        payload: { services: data.services, companyServices: data.companyServices }
    }
}

export const setNextToken = (token) => {
    return {
        type: Types.SET_NEXT_TOKEN,
        payload: token
    }
}