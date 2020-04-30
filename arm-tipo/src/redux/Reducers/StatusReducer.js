const ADD_STATUS = 'add_status';
const UPDATE_STATUS_NAME_RU = 'update_status_name_ru';
const UPDATE_STATUS_NAME_KZ = 'update_status_name_kz';
const SET_STATUSES = 'set_statuses';

let initialState = {
    statuses: [],
    newStatusNameRu: '',
    newStatusNameKz: '',
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
        default:
            return state;
    }
};


export const addStatusCreator = () => ({
    type: ADD_STATUS
});

export const updateStatusNameRuCreator = (newNameRu) => ({
    type: UPDATE_STATUS_NAME_RU,
    newNameRu
});

export const updateStatusNameKzCreator = (newNameKz) => ({
    type: UPDATE_STATUS_NAME_KZ,
    newNameKz
});

export const setStatusesCreator = (statuses) => ({
    type: SET_STATUSES,
    statuses
});

export default StatusReducer;