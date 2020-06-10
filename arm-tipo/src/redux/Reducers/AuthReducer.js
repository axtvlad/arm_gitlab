import {restAPI} from "../../api/API";

const SET_USER_DATA = 'set_user_data';
const SET_AUTH_IN_PROCESS = 'set_auth_in_progress';
const SET_IS_AUTH = 'set_is_auth';
const UPDATE_AUTH_LOGIN = 'update_auth_login';
const UPDATE_AUTH_PASSWORD = 'update_auth_password';

let initialState = {
    userData: {},
    isAuth: false,
    login: '',
    password: '',
    authInProcess: false,
};

const AuthReducer = (state = initialState, action) => {

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
        case UPDATE_AUTH_LOGIN:
            return {
                ...state,
                login: action.login
            };
        case UPDATE_AUTH_PASSWORD:
            return {
                ...state,
                password: action.password
            };
        case SET_AUTH_IN_PROCESS:
            return {
                ...state,
                authInProcess: action.authInProcess
            };
        default:
            return state;
    }
};

export const setUserData = (userData) => ({
    type: SET_USER_DATA,
    userData
});

export const setAuthInProcess = (authInProcess) => ({
    type: SET_AUTH_IN_PROCESS,
    authInProcess
});

export const setIsAuth = (isAuth) => ({
    type: SET_IS_AUTH,
    isAuth
});

export const updateAuthLogin = (login) => ({
    type: UPDATE_AUTH_LOGIN,
    login
});

export const updateAuthPassword = (password) => ({
    type: UPDATE_AUTH_PASSWORD,
    password
});

export const postAuthUserData = (authUserData) => (dispatch) => {

    dispatch(setAuthInProcess(true));

    restAPI.auth.auth(authUserData)
        .then(response => {
            dispatch(setIsAuth(response.auth));

            if (response.auth === true) {
                dispatch(setUserData(response.user));
            }

            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('isAuth', response.auth);

            dispatch(setAuthInProcess(false));
        });
};

export default AuthReducer;