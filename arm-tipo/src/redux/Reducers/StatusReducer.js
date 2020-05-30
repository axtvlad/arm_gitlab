import {restAPI} from "../../api/API";

const ADD_STATUS = 'add_status';
const UPDATE_STATUS_NAME_RU = 'update_status_name_ru';
const UPDATE_STATUS_NAME_KZ = 'update_status_name_kz';
const SET_STATUSES = 'set_statuses';
const SET_STATUSES_COUNT = 'set_statuses_count';
const SET_STATUSES_IS_FETCHING = 'set_statuses_is_fetching';
const SET_CURRENT_STATUS = 'set_current_status';
const SET_IS_POSTED = 'set_is_posted';
const REMOVE_STATUS = 'remove_status';

let initialState = {
    statuses: [],
    newStatusNameRu: '',
    newStatusNameKz: '',
    statusesCount: 0,
    isFetching: false,
    currentStatus: null,
    isPosted: false,
};

const StatusReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_STATUS:
            return {
                ...state,
                newStatusNameRu: '',
                newStatusNameKz: '',
                statuses: [...state.statuses, {
                    id: action.id,
                    name_ru: state.newStatusNameRu,
                    name_kz: state.newStatusNameKz,
                }]
            };
        case REMOVE_STATUS:
            return {
                ...state,
                statuses: state.statuses.filter(status => status.id !== action.id)
            };
        case UPDATE_STATUS_NAME_RU:
            return {
                ...state,
                newStatusNameRu: action.newNameRu
            };
        case UPDATE_STATUS_NAME_KZ:
            return {
                ...state,
                newStatusNameKz: action.newNameKz
            };
        case SET_STATUSES:
            return {
                ...state,
                statuses: [...state.statuses, ...action.statuses]
            };
        case SET_STATUSES_COUNT:
            return {
                ...state,
                statusesCount: action.statusesCount
            };
        case SET_STATUSES_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_CURRENT_STATUS:
            return {
                ...state,
                currentStatus: action.currentStatus
            };
        case SET_IS_POSTED:
            return {
                ...state,
                isPosted: action.isPosted
            };
        default:
            return state;
    }
};

export const addStatus = (id) => ({
    type: ADD_STATUS,
    id
});

export const removeStatus = (id) => ({
    type: REMOVE_STATUS,
    id
});

export const setIsPosted = (isPosted) => ({
    type: SET_IS_POSTED,
    isPosted
});

export const updateStatusNameRu = (newNameRu) => ({
    type: UPDATE_STATUS_NAME_RU,
    newNameRu
});

export const updateStatusNameKz = (newNameKz) => ({
    type: UPDATE_STATUS_NAME_KZ,
    newNameKz
});

export const setStatuses = (statuses) => ({
    type: SET_STATUSES,
    statuses
});

export const setStatusesCount = (statusesCount) => ({
    type: SET_STATUSES_COUNT,
    statusesCount
});

export const setStatusesIsFetching = (isFetching) => ({
    type: SET_STATUSES_IS_FETCHING,
    isFetching
});

export const setCurrentStatus = (currentStatus) => ({
    type: SET_CURRENT_STATUS,
    currentStatus
});


export const getStatuses = () => (dispatch) => {

    dispatch(setStatusesIsFetching(true));

    restAPI.statuses.getStatuses()
        .then(response => {
            dispatch(setStatusesCount(response.totalCount));
            dispatch(setStatuses(response.data));

            console.info('statuses: ', response.data);

            dispatch(setStatusesIsFetching(false));
        });
};

export const getStatusById = (id) => (dispatch) => {

    dispatch(setStatusesIsFetching(true));

    restAPI.statuses.getStatusById(id)
        .then(response => {
            dispatch(setCurrentStatus(response.data));

            console.info('status: ', response.data);

            dispatch(setStatusesIsFetching(false));

            dispatch(setIsPosted(true));
            dispatch(setIsPosted(false));
        });
};

export const postStatus = (newStatus) => (dispatch) => {

    dispatch(setStatusesIsFetching(true));

    restAPI.statuses.postStatus(newStatus)
        .then(response => {
            console.info('posted status: ', response.data);

            dispatch(addStatus(response.data.id));

            dispatch(setStatusesIsFetching(false));

            dispatch(setIsPosted(true));
            dispatch(setIsPosted(false));
        });
};

export const deleteStatusById = (id) => (dispatch) => {

    dispatch(setStatusesIsFetching(true));

    restAPI.statuses.deleteStatusById(id)
        .then(response => {
            console.info('deleted status: ', response.data);

            dispatch(removeStatus(id));

            dispatch(setStatusesIsFetching(false));
        });
};

export default StatusReducer;