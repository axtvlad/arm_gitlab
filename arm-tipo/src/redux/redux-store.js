import {combineReducers, createStore} from "redux";
import TypeReducer from "./Reducers/TypeReducer";
import DepartmentReducer from "./Reducers/DepartmentReducer";
import StatusReducer from "./Reducers/StatusReducer";
import MainDocReducer from "./Reducers/MainDocReducer";
import RolesReducer from "./Reducers/RolesReducer";

let reducers = combineReducers({
    typesDir: TypeReducer,
    departmentsDir: DepartmentReducer,
    statusesDir: StatusReducer,
    rolesDir: RolesReducer,
    mainDocsDir: MainDocReducer,
});

let store = createStore(reducers);

window.store = store.getState();

export default store;