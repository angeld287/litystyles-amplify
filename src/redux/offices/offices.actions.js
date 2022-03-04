import { Types } from "./offices.types";

export const setOffice = office => ({
    type: Types.ADD_ITEM,
    payload: office
})

export const editOffice = office => ({
    type: Types.EDIT_ITEM,
    payload: office
})

export const removeOffice = office => ({
    type: Types.REMOVE_ITEM,
    payload: office
})

export const setItemsFromStore = (data) => {
    return {
        type: Types.SET_ITEMS,
        payload: data.offices
    }
}

export const setNextToken = (token) => {
    return {
        type: Types.SET_NEXT_TOKEN,
        payload: token
    }
}