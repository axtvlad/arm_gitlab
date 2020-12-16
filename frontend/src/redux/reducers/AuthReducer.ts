import {authAPI} from "../../api/authAPI";
import {AuthDataType} from "../../types/types";
import {BaseThunkType, InferActionsTypes} from "../redux-store";

type InitialType = typeof initial

const initial = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    isAdmin: false
};

export const AuthReducer = (state = initial, action: ActionTypes): InitialType => {
    switch (action.type) {
        case 'ARM/AUTH/SET_AUTH_USER_DATA':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};

export const authActions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean, isAdmin: boolean) => ({
        type: 'ARM/AUTH/SET_AUTH_USER_DATA',
        payload: {userId, email, login, isAuth, isAdmin}
    } as const),
}

export const login = (authData: AuthDataType): ThunkType => async (dispatch) => {
    const res = await authAPI.login(authData)

    await Promise.all([res])
        .then(() => {
            dispatch(me());
        })
        .catch(e => {
            return alert('some error')
        })
};

export const logout = (): ThunkType => async (dispatch) => {
    const res = await authAPI.logout()

    Promise.all([res])
        .then(() => {
            dispatch(authActions.setAuthUserData(null, null, null, false, false))
        })
        .catch(e => {
            return alert('some error')
        })
};

export const me = (): ThunkType => async (dispatch) => {
    const res = await authAPI.me();

    Promise.all([res])
        .then(() => {
            const {id, email, login, isAdmin} = res.data;

            dispatch(authActions.setAuthUserData(id, email, login, true, isAdmin))
        })
        .catch(e => {
            return alert('some error')
        })
}

type ThunkType = BaseThunkType<ActionTypes> // | FormAction> from redux-forms. Если ограничиваем только нашими actions
type ActionTypes = InferActionsTypes<typeof authActions>
