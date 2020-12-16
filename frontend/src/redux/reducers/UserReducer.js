import {usersAPI} from "../../api/usersAPI";

const SET_USERS = 'set_users';
const SET_USERS_COUNT = 'set_users_count';
const SET_USERS_IS_FETCHING = 'set_users_is_fetching';
const SET_CURRENT_USER = 'set_current_user';

const initialState = {
    users: null,
    usersCount: 0,
    isFetching: false,
    currentUser: undefined,
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
        default:
            return state;
    }
};

const setUsers = (users) => ({
    type: SET_USERS,
    users
});

const setUsersCount = (usersCount) => ({
    type: SET_USERS_COUNT,
    usersCount
});

const setUsersIsFetching = (isFetching) => ({
    type: SET_USERS_IS_FETCHING,
    isFetching
});

const setCurrentUser = (currentUser) => ({
    type: SET_CURRENT_USER,
    currentUser
});

export const getUsers = () => async (dispatch) => {
    dispatch(setUsersIsFetching(true));

    const response = await usersAPI.getUsers()

    dispatch(setUsersCount(response.totalCount));
    dispatch(setUsers(response.data));
    dispatch(setUsersIsFetching(false));
};

export const getUserById = (userId) => async (dispatch) => {
    const res = await usersAPI.getUserById(userId)

    dispatch(setCurrentUser(res.data));
};

export const postUser = (newUser) => async (dispatch) => {
    await usersAPI.postUser(newUser)

    dispatch(getUsers())
};

export const deleteUserById = (id) => async (dispatch) => {
    await usersAPI.deleteUserById(id)

    dispatch(getUsers())
};

export const updateUser = (id, data) => async (dispatch) => {
    await usersAPI.updateUser(id, data)

    dispatch(getUserById(id))
};