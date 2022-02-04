import { Types } from '../../utils/Items/Types'

export const setCurrentUser = user => ({
    type: Types.SET_CURRENT_USER,
    payload: user
});