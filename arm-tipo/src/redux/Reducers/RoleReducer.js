import {restAPI} from "../../api/API";

const SET_ROLES = 'set_roles';
const SET_ROLES_COUNT = 'set_roles_count';
const SET_ROLES_IS_FETCHING = 'set_roles_is_fetching';
const SET_CURRENT_ROLE = 'set_current_role';

const initialState = {
    roles: [],
    rolesCount: 0,
    isFetching: false,
    currentRole: null,
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
        default:
            return state;
    }
};

const setRoles = (roles) => ({
    type: SET_ROLES,
    roles
});

const setRolesCount = (rolesCount) => ({
    type: SET_ROLES_COUNT,
    rolesCount
});

const setRolesIsFetching = (isFetching) => ({
    type: SET_ROLES_IS_FETCHING,
    isFetching
});

const setCurrentRole = (currentRole) => ({
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

export const updateRole = (id, data) => async (dispatch) => {
    await restAPI.roles.updateRole(id, data)

    dispatch(getRoleById(id))
};