import {DirectoryType, NewDirectoryType} from "../../types/types";
import {BaseThunkType, InferActionsTypes} from "../redux-store";
import {directoriesAPI, DirectoryNameEnum} from "../../api/directoriesAPI";

type InitialType = typeof initial
type ThunkType = BaseThunkType<ActionTypes> // | FormAction> from redux-forms. Если ограничиваем только нашими actions
type ActionTypes = InferActionsTypes<typeof directoriesActions>

const initial = {
    directories: {
        categories: {
            recordsList: null as null | Array<DirectoryType>,
            totalCount: null as null | number,
            isFetching: false,
        },
        cities: {
            recordsList: null as null | Array<DirectoryType>,
            totalCount: null as null | number,
            isFetching: false,
        },
        customers: {
            recordsList: null as null | Array<DirectoryType>,
            totalCount: null as null | number,
            isFetching: false,
        },
        departments: {
            recordsList: null as null | Array<DirectoryType>,
            totalCount: null as null | number,
            isFetching: false,
        },
        genders: {
            recordsList: null as null | Array<DirectoryType>,
            totalCount: null as null | number,
            isFetching: false,
        },
        roles: {
            recordsList: null as null | Array<DirectoryType>,
            totalCount: null as null | number,
            isFetching: false,
        },
        statuses: {
            recordsList: null as null | Array<DirectoryType>,
            totalCount: null as null | number,
            isFetching: false,
        },
        types: {
            recordsList: null as null | Array<DirectoryType>,
            totalCount: null as null | number,
            isFetching: false,
        }
    },
    currentDirectoryRecord: null as null | DirectoryType,
    page: 1,
    count: 5,
}

export const DirectoriesReducer = (state = initial, action: ActionTypes): InitialType => {
    switch (action.type) {
        case 'ARM/CATEGORIES/SET_CATEGORY':
            return {
                ...state,
                directories: {
                    ...state.directories,
                    [action.payload.directory]: {
                        ...state.directories[action.payload.directory],
                        recordsList: action.payload.directoryRecords
                    }
                }
            };
        case 'ARM/CATEGORIES/SET_CATEGORY_TOTAL_COUNT':
            return {
                ...state,
                directories: {
                    ...state.directories,
                    [action.payload.directory]: {
                        ...state.directories[action.payload.directory],
                        totalCount: action.payload.totalCount
                    }
                }
            };
        case 'ARM/CATEGORIES/SET_CATEGORY_IS_FETCHING':
            return {
                ...state,
                directories: {
                    ...state.directories,
                    [action.payload.directory]: {
                        ...state.directories[action.payload.directory],
                        isFetching: action.payload.isFetching
                    }
                }
            };
        case 'ARM/CATEGORIES/SET_CURRENT_DIRECTORY_RECORD':
            return {
                ...state,
                currentDirectoryRecord: action.payload.currentDirectoryRecord
            };
        default:
            return state;
    }
}

export const directoriesActions = {
    setDirectoryRecords: (directory: DirectoryNameEnum, directoryRecords: Array<DirectoryType>) => ({
        type: 'ARM/CATEGORIES/SET_CATEGORY',
        payload: {directory, directoryRecords}
    } as const),
    setDirectoryTotalCount: (directory: DirectoryNameEnum, totalCount: number) => ({
        type: 'ARM/CATEGORIES/SET_CATEGORY_TOTAL_COUNT',
        payload: {directory, totalCount}
    } as const),
    setDirectoryIsFetching: (directory: DirectoryNameEnum, isFetching: boolean) => ({
        type: 'ARM/CATEGORIES/SET_CATEGORY_IS_FETCHING',
        payload: {directory, isFetching}
    } as const),
    setCurrentDirectoryRecord: (currentDirectoryRecord: DirectoryType) => ({
        type: 'ARM/CATEGORIES/SET_CURRENT_DIRECTORY_RECORD',
        payload: {currentDirectoryRecord}
    } as const)
}

export const getDirectoryRecords = (directory: DirectoryNameEnum): ThunkType => async (dispatch, getState) => {
    dispatch(directoriesActions.setDirectoryIsFetching(directory, true))

    const [count, page] = [getState().directories.count, getState().directories.page]

    const response = await directoriesAPI.getDirectoryRecordsList(directory, count, page)

    dispatch(directoriesActions.setDirectoryTotalCount(directory, response.totalCount))
    dispatch(directoriesActions.setDirectoryRecords(directory, response.data))
    dispatch(directoriesActions.setDirectoryIsFetching(directory, false));
};

export const getDirectoryRecordById = (directory: DirectoryNameEnum, id: number): ThunkType => async (dispatch) => {
    const response = await directoriesAPI.getDirectoryRecordById(directory, id)

    dispatch(directoriesActions.setCurrentDirectoryRecord(response.data));
};

export const postDirectoryRecord = (directory: DirectoryNameEnum, formData: NewDirectoryType): ThunkType => async (dispatch) => {
    await directoriesAPI.postDirectoryRecord(directory, formData);

    await dispatch(getDirectoryRecords(directory))
}

export const deleteDirectoryRecordById = (directory: DirectoryNameEnum, id: number): ThunkType => async (dispatch) => {
    await directoriesAPI.deleteDirectoryRecordById(directory, id)

    await dispatch(getDirectoryRecords(directory))
};

export const updateDirectoryRecordById = (directory: DirectoryNameEnum, id: number, data: NewDirectoryType): ThunkType => async (dispatch) => {
    await directoriesAPI.updateDirectoryRecordById(directory, id, data)

    await dispatch(getDirectoryRecordById(directory, id))
};