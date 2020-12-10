import {restAPI} from "../../api/API";

const SET_USER_DATA = 'set_user_data';
const SET_AUTH_IN_PROCESS = 'set_auth_in_progress';
const SET_IS_AUTH = 'set_is_auth';
const SET_IS_ADMIN = 'SET_IS_ADMIN';

const initialState = {
    userData: {},
    isAuth: false,
    login: '',
    password: '',
    authInProcess: false,
    isAdmin: false
};

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                userData: action.userData
            };
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.isAuth
            };
        case SET_AUTH_IN_PROCESS:
            return {
                ...state,
                authInProcess: action.authInProcess
            };
        case SET_IS_ADMIN:
            return {
                ...state,
                isAdmin: action.isAdmin
            };
        default:
            return state;
    }
};

export const setUserData = (userData) => ({
    type: SET_USER_DATA,
    userData
});

const setAuthInProcess = (authInProcess) => ({
    type: SET_AUTH_IN_PROCESS,
    authInProcess
});

export const setIsAuth = (isAuth) => ({
    type: SET_IS_AUTH,
    isAuth
});

export const setIsAdmin = (isAdmin) => ({
    type: SET_IS_ADMIN,
    isAdmin
});

export const postAuthUserData = (userData) => async (dispatch) => {
    dispatch(setAuthInProcess(true));

    const response = await restAPI.auth.auth(userData)

    dispatch(setIsAuth(response.auth));

    if (response.auth === true) {
        dispatch(setUserData(response.user));
        dispatch(setIsAdmin(response.user.isAdmin));
    }

    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('isAuth', response.auth);

    dispatch(setAuthInProcess(false));
};