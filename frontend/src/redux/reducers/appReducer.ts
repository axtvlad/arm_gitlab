import {getUsers} from "./UserReducer";
import {BaseThunkType, InferActionsTypes} from "../redux-store";
import {authActions} from "./AuthReducer";

type InitialType = typeof initial

const initial = {
    initialized: false,
}

export const appReducer = (state = initial, action: ActionTypes): InitialType => {
    switch (action.type) {
        case 'ARM/APP/INITIALIZED_SUCCESS': {
            return {
                ...state,
                initialized: true
            }
        }
        default: {
            return state;
        }
    }
}

export const appActions = {
    initializedSuccess: () => ({
        type: 'ARM/APP/INITIALIZED_SUCCESS',
    } as const)
}


export const initializeApp = (): ThunkType => async (dispatch) => {
    if (localStorage.getItem('isAuth') && localStorage.getItem('user')) {
        // @ts-ignore
        dispatch(authActions.setIsAuth(true))
        // @ts-ignore
        dispatch(authActions.setUserData(JSON.parse(localStorage.getItem('user'))))
        // @ts-ignore
        dispatch(authActions.setIsAdmin(JSON.parse(localStorage.getItem('user')).isAdmin))
    }

    Promise.all([
        dispatch(getUsers())
    ])
        .then(() => {
            dispatch(appActions.initializedSuccess())
        })
}

type ThunkType = BaseThunkType<ActionTypes> // | FormAction> from redux-forms. Если ограничиваем только нашими actions
type ActionTypes = InferActionsTypes<typeof appActions>
