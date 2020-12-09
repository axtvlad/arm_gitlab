import {getUsers} from "./UserReducer";
import {setIsAdmin, setIsAuth, setUserData} from "./AuthReducer";
import {getMainDocs} from "./MainDocReducer";
import {getDepartments} from "./DepartmentReducer";
import {getStatuses} from "./StatusReducer";
import {getTypes} from "./TypeReducer";
import {getOtherDocs} from "./OtherDocReducer";

const INITIALIZED_SUCCESS = 'ARM/APP/INITIALIZED_SUCCESS';

const initial = {
    initialized: false,
}

export const appReducer = (state = initial, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
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

export const initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS,
})


export const initializeApp = () => async (dispatch) => {
    if (localStorage.getItem('isAuth') && localStorage.getItem('user')) {

        dispatch(setIsAuth(true))
        dispatch(setUserData(JSON.parse(localStorage.getItem('user'))))
        dispatch(setIsAdmin(JSON.parse(localStorage.getItem('user')).isAdmin))
    }

    console.log(localStorage.getItem('isAuth'))

    await Promise.all([
        getUsers(),
        getMainDocs(),
        getDepartments(),
        getStatuses(),
        getTypes(),
        getOtherDocs(),
    ])
        .then(() => {
            dispatch(initializedSuccess())
        })
}