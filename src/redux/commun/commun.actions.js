import { Types } from '../../utils/Items/Types'

export const setCurrentScreen = screen => ({
    type: Types.SET_CURRENT_SCREEN,
    payload: screen
})

export const setLoadingScreen = loading => ({
    type: Types.SET_LOADING_SCREEN,
    payload: loading
})