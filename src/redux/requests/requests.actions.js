import { Types } from "./requests.types";

export const setRequest = request => ({
    type: Types.ADD_ITEM,
    payload: request
})

export const editRequest = request => ({
    type: Types.EDIT_ITEM,
    payload: request
})

export const removeRequest = request => ({
    type: Types.REMOVE_ITEM,
    payload: request
})

export const setItemsFromStore = (requests) => {
    return {
        type: Types.SET_ITEMS,
        payload: requests
    }
}

export const setNextToken = (token) => {
    return {
        type: Types.SET_NEXT_TOKEN,
        payload: token
    }
}