import {combineReducers, createStore} from "redux";
import TypeReducer from "./TypeReducer";
import DepartmentReducer from "./DepartmentReducer";
import StatusReducer from "./StatusReducer";

let reducers = combineReducers({
    typesDir: TypeReducer,
    departmentsDir: DepartmentReducer,
    statusesDir: StatusReducer,
});

let store = createStore(reducers);


export default store;