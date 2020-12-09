import {restAPI} from "../../api/API";

const SET_USERS = 'set_users';
const SET_USERS_COUNT = 'set_users_count';
const SET_USERS_IS_FETCHING = 'set_users_is_fetching';
const SET_CURRENT_USER = 'set_current_user';
const SET_IS_POSTED = 'set_is_posted';

const getIsAdmin = () => {
    if (!localStorage.getItem('isAdmin') || localStorage.getItem('isAdmin') === 'false') {
        return false;
    }

    if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).isAdmin) {
        return true
    }
}

const initialState = {
    users: [],
    usersCount: 0,
    isFetching: false,
    currentUser: undefined,
    isAdmin: getIsAdmin(),
    isPosted: false,
};

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_USERS_COUNT:
            return {
                ...state,
                usersCount: action.usersCount
            };
        case SET_USERS_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser
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

export const setUsers = (users) => ({
    type: SET_USERS,
    users
});

export const setUsersCount = (usersCount) => ({
    type: SET_USERS_COUNT,
    usersCount
});

export const setUsersIsFetching = (isFetching) => ({
    type: SET_USERS_IS_FETCHING,
    isFetching
});

export const setCurrentUser = (currentUser) => ({
    type: SET_CURRENT_USER,
    currentUser
});

export const getUsers = () => async (dispatch) => {
    dispatch(setUsersIsFetching(true));

    const response = await restAPI.users.getUsers()

    dispatch(setUsersCount(response.totalCount));
    dispatch(setUsers(response.data));
    dispatch(setUsersIsFetching(false));
};

export const getUserById = (userId) => async (dispatch) => {
    const res = await restAPI.users.getUserById(userId)

    dispatch(setCurrentUser(res.data));
};

export const postUser = (newUser) => async (dispatch) => {
    await restAPI.users.postUser(newUser)

    dispatch(getUsers())
};

export const deleteUserById = (id) => async (dispatch) => {
    await restAPI.users.deleteUserById(id)

    dispatch(getUsers())
};