import {restAPI} from "../../api/API";

const ADD_ROLE = 'add_role';
const UPDATE_ROLE_NAME_RU = 'update_role_name_ru';
const UPDATE_ROLE_NAME_KZ = 'update_role_name_kz';
const SET_ROLES = 'set_roles';
const SET_ROLES_COUNT = 'set_roles_count';
const SET_ROLES_IS_FETCHING = 'set_roles_is_fetching';
const SET_CURRENT_ROLE = 'set_current_role';
const SET_IS_POSTED = 'set_is_posted';
const REMOVE_ROLE = 'remove_role';

let initialState = {
    roles: [],
    newRoleNameRu: '',
    newRoleNameKz: '',
    rolesCount: 0,
    isFetching: false,
    currentRole: null,
    isPosted: false,
};

const RoleReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_ROLE:
            return {
                ...state,
                newRoleNameRu: '',
                newRoleNameKz: '',
                roles: [...state.roles, {
                    id: action.id,
                    name_ru: state.newRoleNameRu,
                    name_kz: state.newRoleNameKz,
                }]
            };
        case REMOVE_ROLE:
            return {
                ...state,
                roles: state.roles.filter(role => role.id !== action.id)
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
        case SET_CURRENT_ROLE:
            return {
                ...state,
                currentRole: action.currentRole
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

export const addRole = (id) => ({
    type: ADD_ROLE,
    id
});

export const removeRole = (id) => ({
    type: REMOVE_ROLE,
    id
});

export const setIsPosted = (isPosted) => ({
    type: SET_IS_POSTED,
    isPosted
});

export const updateRoleNameRu = (newNameRu) => ({
    type: UPDATE_ROLE_NAME_RU,
    newNameRu
});

export const updateRoleNameKz = (newNameKz) => ({
    type: UPDATE_ROLE_NAME_KZ,
    newNameKz
});

export const setRoles = (roles) => ({
    type: SET_ROLES,
    roles
});

export const setRolesCount = (rolesCount) => ({
    type: SET_ROLES_COUNT,
    rolesCount
});

export const setRolesIsFetching = (isFetching) => ({
    type: SET_ROLES_IS_FETCHING,
    isFetching
});

export const setCurrentRole = (currentRole) => ({
    type: SET_CURRENT_ROLE,
    currentRole
});

export const getRoles = () => (dispatch) => {

    dispatch(setRolesIsFetching(true));

    restAPI.roles.getRoles()
        .then(response => {
            dispatch(setRolesCount(response.totalCount));
            dispatch(setRoles(response.data));

            console.info('roles: ', response.data);

            dispatch(setRolesIsFetching(false));
        });
};

export const getRoleById = (id) => (dispatch) => {

    dispatch(setRolesIsFetching(true));

    restAPI.roles.getRolesById(id)
        .then(response => {
            dispatch(setCurrentRole(response.data));

            console.info('role: ', response.data);

            dispatch(setRolesIsFetching(false));

            dispatch(setIsPosted(true));
            dispatch(setIsPosted(false));
        });
};

export const postRole = (newRole) => (dispatch) => {

    dispatch(setRolesIsFetching(true));

    restAPI.roles.postRole(newRole)
        .then(response => {
            console.info('posted role: ', response.data);

            dispatch(addRole(response.data.id));

            dispatch(setRolesIsFetching(false));

            dispatch(setIsPosted(true));
            dispatch(setIsPosted(false));
        });
};

export const deleteRoleById = (id) => (dispatch) => {

    dispatch(setRolesIsFetching(true));

    restAPI.roles.deleteRoleById(id)
        .then(response => {
            console.info('deleted role: ', response.data);

            dispatch(removeRole(id));

            dispatch(setRolesIsFetching(false));
        });
};

export default RoleReducer;