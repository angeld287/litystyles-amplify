import { combineReducers } from "redux";

import userReducer from './user/user.reducer';
import communReducer from './commun/commun.reducer'
import servicesReducer from "./services/services.reducer";
import companyReducer from "./company/company.reducer";

export default combineReducers({
    user: userReducer,
    commun: communReducer,
    services: servicesReducer,
    company: companyReducer,
});