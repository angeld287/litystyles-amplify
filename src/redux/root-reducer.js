import { combineReducers } from "redux";

import userReducer from './user/user.reducer';
import communReducer from './commun/commun.reducer'
import servicesReducer from "./services/services.reducer";
import companyReducer from "./company/company.reducer";
import productsReducer from "./products/products.reducer";
import officesReducer from "./offices/offices.reducer";
import employeesReducer from "./employees/employees.reducer";
import typesReducer from "./types/types.reducer";
import categoriesReducer from "./categories/categories.reducer";

export default combineReducers({
    user: userReducer,
    commun: communReducer,
    services: servicesReducer,
    company: companyReducer,
    products: productsReducer,
    offices: officesReducer,
    employees: employeesReducer,
    types: typesReducer,
    categories: categoriesReducer,
});