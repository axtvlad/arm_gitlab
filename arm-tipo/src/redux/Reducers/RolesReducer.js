const ADD_ROLE = 'add_role';
const UPDATE_ROLE_NAME_RU = 'update_role_name_ru';
const UPDATE_ROLE_NAME_KZ = 'update_role_name_kz';

let initialState = {
    roles: [
        {id: 1, name_ru: 'Администратор', name_kz: 'Администратор'},
        {id: 2, name_ru: 'Эксперт', name_kz: 'Сарапшы'},
        {id: 3, name_ru: 'Пользователь', name_kz: 'Қолданушы'},
    ],
    newRoleNameRu: '',
    newRoleNameKz: '',
};

const RolesReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_ROLE:
            return {
                ...state,
                newRoleNameRu: '',
                newRoleNameKz: '',
                roles: [...state.roles, {
                    id: 4,
                    name_ru: state.newRoleNameRu,
                    name_kz: state.newRoleNameKz,
                }]
            };
        case UPDATE_ROLE_NAME_RU:
            return {
                ...state,
                newRoleNameRu: action.newNameRu
            };
        case UPDATE_ROLE_NAME_KZ:
            return {
                ...state,
                newRoleNameKz: action.newNameKz
            };
        default:
            return state;
    }
};


export const addRoleCreator = () => ({
    type: ADD_ROLE
});

export const updateRoleNameRuCreator = (newNameRu) => ({
    type: UPDATE_ROLE_NAME_RU,
    newNameRu
});

export const updateRoleNameKzCreator = (newNameKz) => ({
    type: UPDATE_ROLE_NAME_KZ,
    newNameKz
});

export default RolesReducer;