import { Types } from "./company.types";

export const setCompany = company => ({
    type: Types.SET_ITEM,
    payload: company
})