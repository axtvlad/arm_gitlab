const ADD_STATUS = 'add_status';
const UPDATE_STATUS_NAME_RU = 'update_status_name_ru';
const UPDATE_STATUS_NAME_KZ = 'update_status_name_kz';

const StatusReducer = (state, action) => {
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