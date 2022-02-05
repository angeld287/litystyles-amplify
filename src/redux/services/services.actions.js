import { Types } from "../../utils/Items/Types";

export const setCompanyService = companyService => ({
    type: Types.ADD_ITEM,
    payload: companyService
})

export const removeCompanyService = companyService => ({
    type: Types.REMOVE_ITEM,
    payload: companyService
})