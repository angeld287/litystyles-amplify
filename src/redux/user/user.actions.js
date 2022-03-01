import { Types } from './user.types'

export const setCurrentUser = user => ({
    type: Types.SET_CURRENT_USER,
    payload: user
});