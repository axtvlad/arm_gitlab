const ADD_STATUS = 'add_status';
const UPDATE_STATUS_NAME_RU = 'update_status_name_ru';
const UPDATE_STATUS_NAME_KZ = 'update_status_name_kz';

let initialState = {
    statuses: [
        {id: 1, name_ru: 'Статус 1', name_kz: 'Статус1'},
        {id: 2, name_ru: 'Статус 2', name_kz: 'Статус2'},
        {id: 3, name_ru: 'Статус 3', name_kz: 'Статус3'},
    ],
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

export default StatusReducer;