import { Types } from "./services.types";

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

export const setCompanyServicesItemsFromStore = (data) => {
    return {
        type: Types.SET_COMPANY_SERVICES_ITEMS,
        payload: data
    }
}

export const setCompanyServicesNextToken = (token) => {
    return {
        type: Types.SET_COMPANY_SERVICES_NEXT_TOKEN,
        payload: token
    }
}

export const setNextToken = (token) => {
    return {
        type: Types.SET_NEXT_TOKEN,
        payload: token
    }
}