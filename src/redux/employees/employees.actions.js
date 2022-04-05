import { Types } from "./employees.types";

export const setEmployee = employee => ({
    type: Types.ADD_ITEM,
    payload: employee
})

export const editEmployee = employee => ({
    type: Types.EDIT_ITEM,
    payload: employee
})

export const removeEmployee = employee => ({
    type: Types.REMOVE_ITEM,
    payload: employee
})

export const setItemsFromStore = data => ({
    type: Types.SET_ITEMS,
    payload: data.employees
})

export const setNextToken = (token) => {
    return {
        type: Types.SET_NEXT_TOKEN,
        payload: token
    }
}