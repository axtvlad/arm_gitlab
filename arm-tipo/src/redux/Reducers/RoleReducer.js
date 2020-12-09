import {restAPI} from "../../api/API";

const SET_ROLES = 'set_roles';
const SET_ROLES_COUNT = 'set_roles_count';
const SET_ROLES_IS_FETCHING = 'set_roles_is_fetching';
const SET_CURRENT_ROLE = 'set_current_role';
const SET_IS_POSTED = 'set_is_posted';

const initialState = {
    roles: [],
    rolesCount: 0,
    isFetching: false,
    currentRole: null,
    isPosted: false,
};

export const RoleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ROLES:
            return {
                ...state,
                roles: action.roles
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

export const setIsPosted = (isPosted) => ({
    type: SET_IS_POSTED,
    isPosted
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

export const getRoles = () => async (dispatch) => {
    dispatch(setRolesIsFetching(true));

    const response = await restAPI.roles.getRoles()

    dispatch(setRolesCount(response.totalCount));
    dispatch(setRoles(response.data));
    dispatch(setRolesIsFetching(false));
};

export const getRoleById = (id) => async (dispatch) => {
    const res = await restAPI.roles.getRolesById(id)

    dispatch(setCurrentRole(res.data));
};

export const postRole = (formData) => async (dispatch) => {
    await restAPI.roles.postRole(formData)

    dispatch(getRoles())
};

export const deleteRoleById = (id) => async (dispatch) => {
    await restAPI.roles.deleteRoleById(id)

    dispatch(getRoles())
};