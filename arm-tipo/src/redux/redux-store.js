import {combineReducers, createStore} from "redux";
import TypeReducer from "./Reducers/TypeReducer";
import DepartmentReducer from "./Reducers/DepartmentReducer";
import StatusReducer from "./Reducers/StatusReducer";
import MainDocReducer from "./Reducers/MainDocReducer";
import RoleReducer from "./Reducers/RoleReducer";
import FaqsReducer from "./Reducers/FaqReducer";
import CustomerReducer from "./Reducers/CustomerReducer";

let reducers = combineReducers({
    typesDir: TypeReducer,
    departmentsDir: DepartmentReducer,
    statusesDir: StatusReducer,
    rolesDir: RoleReducer,
    mainDocsDir: MainDocReducer,
    faqsDir: FaqsReducer,
    customersDir: CustomerReducer
});

let store = createStore(reducers);

window.store = store.getState();

export default store;