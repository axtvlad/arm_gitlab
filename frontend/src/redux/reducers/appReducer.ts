import {BaseThunkType, InferActionsTypes} from "../redux-store";
import {me} from "./AuthReducer";
import {getDirectoryRecords} from "./DirectoriesReducer";
import {DirectoryNameEnum} from "../../api/directoriesAPI";

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
    await dispatch(me());

    Promise.all([
        dispatch(getDirectoryRecords(DirectoryNameEnum.genders)),
        dispatch(getDirectoryRecords(DirectoryNameEnum.statuses)),
        dispatch(getDirectoryRecords(DirectoryNameEnum.types)),
        dispatch(getDirectoryRecords(DirectoryNameEnum.departments)),
        dispatch(getDirectoryRecords(DirectoryNameEnum.customers)),
        dispatch(getDirectoryRecords(DirectoryNameEnum.cities)),
        dispatch(getDirectoryRecords(DirectoryNameEnum.roles)),
        dispatch(getDirectoryRecords(DirectoryNameEnum.categories)),
    ]).then(() => {
        dispatch(appActions.initializedSuccess());
    })
}

type ThunkType = BaseThunkType<ActionTypes> // | FormAction> from redux-forms. Если ограничиваем только нашими actions
type ActionTypes = InferActionsTypes<typeof appActions>
