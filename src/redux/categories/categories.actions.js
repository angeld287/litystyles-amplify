import { Types } from "./categories.types";

export const setCategory = category => ({
    type: Types.ADD_ITEM,
    payload: category
})

export const editCategory = category => ({
    type: Types.EDIT_ITEM,
    payload: category
})

export const removeCategory = category => ({
    type: Types.REMOVE_ITEM,
    payload: category
})

export const setItemsFromStore = (data) => {
    return {
        type: Types.SET_ITEMS,
        payload: data.categories
    }
}

export const setNextToken = (token) => {
    return {
        type: Types.SET_NEXT_TOKEN,
        payload: token
    }
}