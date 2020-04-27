import {combineReducers, createStore} from "redux";
import TypeReducer from "./Reducers/TypeReducer";
import DepartmentReducer from "./Reducers/DepartmentReducer";
import StatusReducer from "./Reducers/StatusReducer";
import MainDocReducer from "./Reducers/MainDocReducer";
import RolesReducer from "./Reducers/RolesReducer";
import FaqsReducer from "./Reducers/FaqReducer";

let reducers = combineReducers({
    typesDir: TypeReducer,
    departmentsDir: DepartmentReducer,
    statusesDir: StatusReducer,
    rolesDir: RolesReducer,
    mainDocsDir: MainDocReducer,
    faqsDir: FaqsReducer
});

let store = createStore(reducers);

window.store = store.getState();

export default store;