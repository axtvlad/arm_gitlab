import {authAPI} from "../../api/authAPI";
import {AuthDataType, UserType} from "../../../types/types";
import {BaseThunkType, InferActionsTypes} from "../redux-store";

type InitialType = typeof initial

const initial = {
    userData: null as null | object,
    isAuth: false as boolean,
    login: null as null | string,
    password: null as null | string,
    authInProcess: false,
    isAdmin: false,
};

export const AuthReducer = (state = initial, action: ActionTypes): InitialType => {
    switch (action.type) {
        case 'ARM/AUTH/SET_USER_DATA':
            return {
                ...state,
                userData: action.userData
            };
        case 'ARM/AUTH/SET_IS_AUTH':
            return {
                ...state,
                isAuth: action.isAuth
            };
        case 'ARM/AUTH/SET_AUTH_IN_PROCESS':
            return {
                ...state,
                authInProcess: action.authInProcess
            };
        case 'ARM/AUTH/SET_IS_ADMIN':
            return {
                ...state,
                isAdmin: action.isAdmin
            };
        default:
            return state;
    }
};

export const authActions = {
    setUserData: (userData: UserType) => ({
        type: 'ARM/AUTH/SET_USER_DATA',
        userData
    } as const),
    setAuthInProcess: (authInProcess: boolean) => ({
        type: 'ARM/AUTH/SET_AUTH_IN_PROCESS',
        authInProcess
    } as const),
    setIsAuth: (isAuth: boolean) => ({
        type: 'ARM/AUTH/SET_IS_AUTH',
        isAuth: isAuth
    } as const),
    setIsAdmin: (isAdmin: boolean) => ({
        type: 'ARM/AUTH/SET_IS_ADMIN',
        isAdmin
    } as const),
}

export const postAuthUserData = (authData: AuthDataType): ThunkType => async (dispatch) => {
    dispatch(authActions.setAuthInProcess(true));

    const response = await authAPI.auth(authData)

    dispatch(authActions.setIsAuth(response.auth));

    if (response.auth === true) {
        dispatch(authActions.setUserData(response.data));
        dispatch(authActions.setIsAdmin(response.data.isAdmin));
    }

    localStorage.setItem('user', JSON.stringify(response));
    localStorage.setItem('isAuth', response.auth);

    dispatch(authActions.setAuthInProcess(false));
};

type ThunkType = BaseThunkType<ActionTypes> // | FormAction> from redux-forms. Если ограничиваем только нашими actions
type ActionTypes = InferActionsTypes<typeof authActions>
