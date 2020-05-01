const ADD_ROLE = 'add_role';
const UPDATE_ROLE_NAME_RU = 'update_role_name_ru';
const UPDATE_ROLE_NAME_KZ = 'update_role_name_kz';
const SET_ROLES = 'set_roles';
const SET_ROLES_COUNT = 'set_roles_count';

let initialState = {
    roles: [],
    newRoleNameRu: '',
    newRoleNameKz: '',
    rolesCount: 0,
};

const RoleReducer = (state = initialState, action) => {

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
        case SET_ROLES:
            return {
                ...state,
                roles: [...state.roles, ...action.roles]
            };
        case SET_ROLES_COUNT:
            return {
                ...state,
                rolesCount: action.rolesCount
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

export const setRolesCreator = (roles) => ({
    type: SET_ROLES,
    roles
});

export const setRolesCountCreator = (rolesCount) => ({
    type: SET_ROLES_COUNT,
    rolesCount
});

export default RoleReducer;