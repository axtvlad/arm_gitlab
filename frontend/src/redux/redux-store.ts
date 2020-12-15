import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import {MainDocReducer} from "./reducers/MainDocReducer";
import {FaqReducer} from "./reducers/FaqReducer";
import {UserReducer} from "./reducers/UserReducer";
import {TemplateReducer} from "./reducers/TemplateReducer";
import {AuthReducer} from "./reducers/AuthReducer";
import thunk, {ThunkAction} from 'redux-thunk';
import {OtherDocReducer} from "./reducers/OtherDocReducer";
import {WorkPlanScheduleReducer} from "./reducers/WorkPlanScheduleReducer";
import {SearchReducer} from "./reducers/SearchReducer";
import {appReducer} from "./reducers/appReducer";
import {DirectoriesReducer} from "./reducers/DirectoriesReducer";

const rootReducer = combineReducers({
    mainDocsDir: MainDocReducer,
    otherDocsDir: OtherDocReducer,
    faqsDir: FaqReducer,
    usersDir: UserReducer,
    templatesDir: TemplateReducer,
    authDir: AuthReducer,
    workPlanScheduleDir: WorkPlanScheduleReducer,
    searchDir: SearchReducer,
    app: appReducer,
    directories: DirectoriesReducer,
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
))

export default store;