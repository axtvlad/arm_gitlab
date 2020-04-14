import {combineReducers, createStore} from "redux";
import TypeReducer from "./Reducers/TypeReducer";
import DepartmentReducer from "./Reducers/DepartmentReducer";
import StatusReducer from "./Reducers/StatusReducer";
import MainDocReducer from "./Reducers/MainDocReducer";

let reducers = combineReducers({
    typesDir: TypeReducer,
    departmentsDir: DepartmentReducer,
    statusesDir: StatusReducer,
    mainDocsDir: MainDocReducer,
});

let store = createStore(reducers);

export default store;