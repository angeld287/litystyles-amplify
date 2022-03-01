import { Types } from './commun.types'

export const setCurrentScreen = screen => ({
    type: Types.SET_CURRENT_SCREEN,
    payload: screen
})

export const setLoadingScreen = loading => ({
    type: Types.SET_LOADING_SCREEN,
    payload: loading
})