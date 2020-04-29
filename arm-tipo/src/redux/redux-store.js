import {combineReducers, createStore} from "redux";
import TypeReducer from "./Reducers/TypeReducer";
import DepartmentReducer from "./Reducers/DepartmentReducer";
import StatusReducer from "./Reducers/StatusReducer";
import MainDocReducer from "./Reducers/MainDocReducer";
import RoleReducer from "./Reducers/RoleReducer";
import FaqReducer from "./Reducers/FaqReducer";
import CustomerReducer from "./Reducers/CustomerReducer";
import CategoryReducer from "./Reducers/CategoryReducer";

let reducers = combineReducers({
    typesDir: TypeReducer,
    departmentsDir: DepartmentReducer,
    statusesDir: StatusReducer,
    rolesDir: RoleReducer,
    mainDocsDir: MainDocReducer,
    faqsDir: FaqReducer,
    customersDir: CustomerReducer,
    categoriesDir: CategoryReducer
});

let store = createStore(reducers);

window.store = store.getState();

export default store;