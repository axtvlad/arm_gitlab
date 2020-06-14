import {applyMiddleware, combineReducers, createStore} from "redux";
import TypeReducer from "./Reducers/TypeReducer";
import DepartmentReducer from "./Reducers/DepartmentReducer";
import StatusReducer from "./Reducers/StatusReducer";
import MainDocReducer from "./Reducers/MainDocReducer";
import RoleReducer from "./Reducers/RoleReducer";
import FaqReducer from "./Reducers/FaqReducer";
import CustomerReducer from "./Reducers/CustomerReducer";
import CategoryReducer from "./Reducers/CategoryReducer";
import CityReducer from "./Reducers/CityReducer";
import UserReducer from "./Reducers/UserReducer";
import GenderReducer from "./Reducers/GenderReducer";
import TemplateReducer from "./Reducers/TemplateReducer";
import AuthReducer from "./Reducers/AuthReducer";
import thunkMiddleWare from 'redux-thunk';
import OtherDocReducer from "./Reducers/OtherDocReducer";
import WorkPlanScheduleReducer from "./Reducers/WorkPlanScheduleReducer";
import SearchReducer from "./Reducers/SearchReducer";

let reducers = combineReducers({
    typesDir: TypeReducer,
    departmentsDir: DepartmentReducer,
    statusesDir: StatusReducer,
    rolesDir: RoleReducer,
    mainDocsDir: MainDocReducer,
    otherDocsDir: OtherDocReducer,
    faqsDir: FaqReducer,
    customersDir: CustomerReducer,
    categoriesDir: CategoryReducer,
    citiesDir: CityReducer,
    usersDir: UserReducer,
    gendersDir: GenderReducer,
    templatesDir: TemplateReducer,
    authDir: AuthReducer,
    workPlanScheduleDir: WorkPlanScheduleReducer,
    searchDir: SearchReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

window.store = store.getState();

export default store;