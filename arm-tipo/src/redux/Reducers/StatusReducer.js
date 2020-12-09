import {restAPI} from "../../api/API";

const SET_STATUSES = 'set_statuses';
const SET_STATUSES_COUNT = 'set_statuses_count';
const SET_STATUSES_IS_FETCHING = 'set_statuses_is_fetching';
const SET_CURRENT_STATUS = 'set_current_status';
const SET_IS_POSTED = 'set_is_posted';

const initialState = {
    statuses: [],
    statusesCount: 0,
    isFetching: false,
    currentStatus: null,
    isPosted: false,
};

export const StatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATUSES:
            return {
                ...state,
                statuses: action.statuses
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

export const setIsPosted = (isPosted) => ({
    type: SET_IS_POSTED,
    isPosted
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

export const getStatuses = () => async (dispatch) => {
    dispatch(setStatusesIsFetching(true));

    const response = await restAPI.statuses.getStatuses()

    dispatch(setStatusesCount(response.totalCount));
    dispatch(setStatuses(response.data));
    dispatch(setStatusesIsFetching(false));
};

export const getStatusById = (id) => async (dispatch) => {
    const res = await restAPI.statuses.getStatusById(id)

    dispatch(setCurrentStatus(res.data));
};

export const postStatus = (newStatus) => async (dispatch) => {
    await restAPI.statuses.postStatus(newStatus)

    dispatch(getStatuses())
};

export const deleteStatusById = (id) => async (dispatch) => {
    await restAPI.statuses.deleteStatusById(id)

    dispatch(getStatuses())
};