const ADD_ROLE = 'add_role';
const UPDATE_ROLE_NAME_RU = 'update_role_name_ru';
const UPDATE_ROLE_NAME_KZ = 'update_role_name_kz';
const SET_ROLES = 'set_roles';
const SET_ROLES_COUNT = 'set_roles_count';
const SET_ROLES_IS_FETCHING = 'set_roles_is_fetching';

let initialState = {
    roles: [],
    newRoleNameRu: '',
    newRoleNameKz: '',
    rolesCount: 0,
    isFetching: false,
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
        case SET_ROLES_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        default:
            return state;
    }
};

export const addRole  = () => ({
    type: ADD_ROLE
});

export const updateRoleNameRu  = (newNameRu) => ({
    type: UPDATE_ROLE_NAME_RU,
    newNameRu
});

export const updateRoleNameKz  = (newNameKz) => ({
    type: UPDATE_ROLE_NAME_KZ,
    newNameKz
});

export const setRoles  = (roles) => ({
    type: SET_ROLES,
    roles
});

export const setRolesCount  = (rolesCount) => ({
    type: SET_ROLES_COUNT,
    rolesCount
});

export const setRolesIsFetching  = (isFetching) => ({
    type: SET_ROLES_IS_FETCHING,
    isFetching
});


export default RoleReducer;