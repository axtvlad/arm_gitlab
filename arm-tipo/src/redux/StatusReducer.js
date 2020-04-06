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
        case ADD_STATUS: {
            let newStatus = {
                id: 4,
                name_ru: state.newStatusNameRu,
                name_kz: state.newStatusNameKz,
            };
            state.statuses.push(newStatus);
            state.newStatusNameRu = '';
            state.newStatusNameKz = '';
            return state;
        }
        case UPDATE_STATUS_NAME_RU: {
            state.newStatusNameRu = action.newName;
            return state;
        }
        case UPDATE_STATUS_NAME_KZ: {
            state.newStatusNameKz = action.newName;
            return state;
        }
        default: {
            return state;
        }
    }
};


export const addStatusCreator = () => ({
    type: ADD_STATUS
});

export const updateStatusNameRuCreator = (newName) => ({
    type: UPDATE_STATUS_NAME_RU,
    newName
});

export const updateStatusNameKzCreator = (newName) => ({
    type: UPDATE_STATUS_NAME_KZ,
    newName
});

export default StatusReducer;