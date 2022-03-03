import { Types } from "./offices.types";

export const setCompanyOffice = companyOffice => ({
    type: Types.ADD_ITEM,
    payload: companyOffice
})

export const editCompanyOffice = companyOffice => ({
    type: Types.EDIT_ITEM,
    payload: companyOffice
})

export const removeCompanyOffice = companyOffice => ({
    type: Types.REMOVE_ITEM,
    payload: companyOffice
})

export const setItemsFromStore = (data) => {
    return {
        type: Types.SET_ITEMS,
        payload: data.companyOffices
    }
}

export const setNextToken = (token) => {
    return {
        type: Types.SET_NEXT_TOKEN,
        payload: token
    }
}