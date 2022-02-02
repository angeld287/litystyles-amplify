import { combineReducers } from "redux";

import userReducer from './user/user.reducer';
import communReducer from './commun/commun.reducer'

export default combineReducers({
    user: userReducer,
    commun: communReducer
});