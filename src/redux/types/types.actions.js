import { Types } from "./types.types";

export const setType = type => ({
    type: Types.ADD_ITEM,
    payload: type
})

export const editType = type => ({
    type: Types.EDIT_ITEM,
    payload: type
})

export const removeType = type => ({
    type: Types.REMOVE_ITEM,
    payload: type
})

export const setItemsFromStore = (data) => {
    return {
        type: Types.SET_ITEMS,
        payload: data.types
    }
}

export const setNextToken = (token) => {
    return {
        type: Types.SET_NEXT_TOKEN,
        payload: token
    }
}