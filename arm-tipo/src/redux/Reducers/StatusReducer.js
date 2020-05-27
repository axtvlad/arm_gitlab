import {restAPI} from "../../api/API";

const ADD_STATUS = 'add_status';
const UPDATE_STATUS_NAME_RU = 'update_status_name_ru';
const UPDATE_STATUS_NAME_KZ = 'update_status_name_kz';
const SET_STATUSES = 'set_statuses';
const SET_STATUSES_COUNT = 'set_statuses_count';
const SET_STATUSES_IS_FETCHING = 'set_statuses_is_fetching';
const SET_CURRENT_STATUS = 'set_current_status';

let initialState = {
    statuses: [],
    newStatusNameRu: '',
    newStatusNameKz: '',
    statusesCount: 0,
    isFetching: false,
    currentStatus: null,
};

const StatusReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_STATUS:
            return {
                ...state,
                newStatusNameRu: '',
                newStatusNameKz: '',
                statuses: [...state.statuses, {
                    id: 4,
                    name_ru: state.newStatusNameRu,
                    name_kz: state.newStatusNameKz,
                }]
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
        default:
            return state;
    }
};

export const addStatus = () => ({
    type: ADD_STATUS
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


export const getStatuses = () => {
    return (dispatch) => {

        dispatch(setStatusesIsFetching(true));

        restAPI.statuses.getStatuses()
            .then(response => {
                dispatch(setStatusesCount(response.totalCount));
                dispatch(setStatuses(response.data));

                console.info('statuses: ', response.data);

                dispatch(setStatusesIsFetching(false));
            });
    }
};

export default StatusReducer;