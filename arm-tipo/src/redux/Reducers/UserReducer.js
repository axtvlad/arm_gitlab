import {restAPI} from "../../api/API";

const ADD_USER = 'add_user';
const UPDATE_USER_FIRSTNAME = 'update_user_firstname';
const UPDATE_USER_LASTNAME = 'update_user_lastname';
const UPDATE_USER_PATRONYMIC = 'update_user_patronymic';
const UPDATE_USER_LOGIN = 'update_user_login';
const UPDATE_USER_PASSWORD = 'update_user_password';
const UPDATE_USER_EMAIL = 'update_user_email';
const UPDATE_USER_PHOTO = 'update_user_photo';
const UPDATE_USER_ROLE_ID = 'update_user_role_id';
const UPDATE_USER_CITY_ID = 'update_user_city_id';
const UPDATE_USER_CUSTOMER_ID = 'update_user_customer_id';
const UPDATE_USER_GENDER_ID = 'update_user_gender_id';
const UPDATE_USER_PHONE = 'update_user_phone';
const UPDATE_USER_LOCALE = 'update_user_locale';
const UPDATE_USER_BIRTH_AT = 'update_user_birth_at';
const UPDATE_USER_IS_ADMIN = 'update_user_is_admin';
const UPDATE_USER_IS_PREMIUM = 'update_user_is_premium';
const UPDATE_USER_IS_BANNED = 'update_user_is_banned';
const SET_USERS = 'set_users';
const SET_USERS_COUNT = 'set_users_count';
const SET_USERS_IS_FETCHING = 'set_users_is_fetching';
const SET_CURRENT_USER = 'set_current_user';
const SET_IS_POSTED = 'set_is_posted';
const REMOVE_USER = 'remove_user';
// Временное решение
const SET_IS_ADMIN = 'set_is_admin';

let getIsAdmin = () => {
    if (!localStorage.getItem('isAdmin') || localStorage.getItem('isAdmin') === 'false') {
        return false;
    }

    if (localStorage.getItem('isAdmin') === 'true') {
        return true
    }
}

let initialState = {
    users: [],
    newUserFirstName: '',
    newUserLastName: '',
    newUserPatronymic: '',
    newUserLogin: '',
    newUserPassword: '',
    newUserEmail: '',
    newUserPhoto: '',
    newUserRoleId: 0,
    newUserCityId: 0,
    newUserCustomerId: 0,
    newUserGenderId: 0,
    newUserPhone: null,
    newUserLocale: '',
    newUserBirthAt: '',
    newUserIsAdmin: false,
    newUserIsPremium: false,
    newUserIsBanned: false,
    usersCount: 0,
    isFetching: false,
    currentUser: undefined,
    isAdmin: getIsAdmin(),
    isPosted: false,
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                newUserFirstName: '',
                newUserLastName: '',
                newUserPatronymic: '',
                newUserLogin: '',
                newUserPassword: '',
                newUserEmail: '',
                newUserPhoto: '',
                newUserRoleId: 0,
                newUserCityId: 0,
                newUserCustomerId: 0,
                newUserGenderId: 0,
                newUserPhone: null,
                newUserLocale: '',
                newUserBirthAt: null,
                newUserIsAdmin: false,
                newUserIsPremium: false,
                newUserIsBanned: false,
                users: [...state.users, {
                    userId: action.userId,
                    firstName: action.newUserFirstName,
                    lastName: action.newUserLastName,
                    patronymic: action.newUserPatronymic,
                    login: action.newUserLogin,
                    password: action.newUserPassword,
                    email: action.newUserEmail,
                    photo: action.newUserPhoto,
                    role_id: action.newUserRoleId,
                    city_id: action.newUserCityId,
                    customer_id: action.newUserCustomerId,
                    gender_id: action.newUserGenderId,
                    phone: action.newUserPhone,
                    locale: action.newUserLocale,
                    birthAt: action.newUserBirthAt,
                    isAdmin: action.newUserIsAdmin,
                    isPremium: action.newUserIsPremium,
                    isBanned: action.newUserIsBanned,
                }],
            };
        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.id)
            };
        case UPDATE_USER_FIRSTNAME:
            return {
                ...state,
                newUserFirstName: action.newFirstName
            };
        case UPDATE_USER_LASTNAME:
            return {
                ...state,
                newUserLastName: action.newLastName
            };
        case UPDATE_USER_PATRONYMIC:
            return {
                ...state,
                newUserPatronymic: action.newPatronymic
            };
        case UPDATE_USER_LOGIN:
            return {
                ...state,
                newUserLogin: action.newLogin
            };
        case UPDATE_USER_PASSWORD:
            return {
                ...state,
                newUserPassword: action.newPassword
            };
        case UPDATE_USER_PHOTO:
            return {
                ...state,
                newUserPhoto: action.newPhoto
            };
        case UPDATE_USER_ROLE_ID:
            return {
                ...state,
                newUserRoleId: action.newRoleId
            };
        case UPDATE_USER_CITY_ID:
            return {
                ...state,
                newUserCityId: action.newCityId
            };
        case UPDATE_USER_CUSTOMER_ID:
            return {
                ...state,
                newUserCustomerId: action.newCustomerId
            };
        case UPDATE_USER_GENDER_ID:
            return {
                ...state,
                newUserGenderId: action.newGenderId
            };
        case UPDATE_USER_PHONE:
            return {
                ...state,
                newUserPhone: action.newUserPhone
            };
        case UPDATE_USER_BIRTH_AT:
            return {
                ...state,
                newUserBirthAt: action.newBirthAt
            };
        case UPDATE_USER_IS_ADMIN:
            return {
                ...state,
                newUserIsAdmin: action.newIsAdmin
            };
        case UPDATE_USER_IS_PREMIUM:
            return {
                ...state,
                newUserIsPremium: action.newIsPremium
            };
        case UPDATE_USER_IS_BANNED:
            return {
                ...state,
                newUserIsBanned: action.newIsBanned
            };
        case UPDATE_USER_EMAIL:
            return {
                ...state,
                newUserEmail: action.newEmail
            };
        case UPDATE_USER_LOCALE:
            return {
                ...state,
                newUserLocale: action.newLocale
            };
        case SET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
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
        case SET_IS_ADMIN:
            return {
                ...state,
                isAdmin: action.isAdmin
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

export const addUser = (id) => ({
    type: ADD_USER,
    id
});

export const removeUser = (id) => ({
    type: REMOVE_USER,
    id
});

export const setIsPosted = (isPosted) => ({
    type: SET_IS_POSTED,
    isPosted
});

export const updateUserFirstName = (newFirstName) => ({
    type: UPDATE_USER_FIRSTNAME,
    newFirstName
});

export const updateUserLastName = (newLastName) => ({
    type: UPDATE_USER_LASTNAME,
    newLastName
});

export const updateUserPatronymic = (newPatronymic) => ({
    type: UPDATE_USER_PATRONYMIC,
    newPatronymic
});

export const updateUserLogin = (newLogin) => ({
    type: UPDATE_USER_LOGIN,
    newLogin
});

export const updateUserPassword = (newPassword) => ({
    type: UPDATE_USER_PASSWORD,
    newPassword
});

export const updateUserEmail = (newEmail) => ({
    type: UPDATE_USER_EMAIL,
    newEmail
});

export const updateUserPhoto = (newPhoto) => ({
    type: UPDATE_USER_PHOTO,
    newPhoto
});

export const updateUserRoleId = (newRoleId) => ({
    type: UPDATE_USER_ROLE_ID,
    newRoleId
});

export const updateUserCityId = (newCityId) => ({
    type: UPDATE_USER_CITY_ID,
    newCityId
});

export const updateUserCustomerId = (newCustomerId) => ({
    type: UPDATE_USER_CUSTOMER_ID,
    newCustomerId
});

export const updateUserGenderId = (newGenderId) => ({
    type: UPDATE_USER_GENDER_ID,
    newGenderId
});

export const updateUserPhone = (newUserPhone) => ({
    type: UPDATE_USER_PHONE,
    newUserPhone
});

export const updateUserLocale = (newLocale) => ({
    type: UPDATE_USER_LOCALE,
    newLocale
});

export const updateUserBirthAt = (newBirthAt) => ({
    type: UPDATE_USER_BIRTH_AT,
    newBirthAt
});

export const updateUserIsAdmin = (newIsAdmin) => ({
    type: UPDATE_USER_IS_ADMIN,
    newIsAdmin
});

export const updateUserIsBanned = (newIsBanned) => ({
    type: UPDATE_USER_IS_BANNED,
    newIsBanned
});

export const updateUserIsPremium = (newIsPremium) => ({
    type: UPDATE_USER_IS_PREMIUM,
    newIsPremium
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

export const setIsAdmin = (isAdmin) => ({
    type: SET_IS_ADMIN,
    isAdmin
});

export const getUsers = () => (dispatch) => {

    dispatch(setUsersIsFetching(true));

    restAPI.users.getUsers()
        .then(response => {
            dispatch(setUsersCount(response.totalCount));
            dispatch(setUsers(response.data));

            console.info('users: ', response.data);

            dispatch(setUsersIsFetching(false));
        });
};

export const getUserById = (userId) => (dispatch) => {

    dispatch(setUsersIsFetching(true));

    restAPI.users.getUserById(userId)
        .then(response => {

            dispatch(setCurrentUser(response.data));

            console.info('user: ', response.data);

            dispatch(setUsersIsFetching(false));
        });
};

export const postUser = (newUser) => (dispatch) => {

    dispatch(setUsersIsFetching(true));

    restAPI.users.postUser(newUser)
        .then(response => {
            console.info('posted user: ', response.data);

            dispatch(addUser(response.data.id));

            dispatch(setUsersIsFetching(false));

            dispatch(setIsPosted(true));
            dispatch(setIsPosted(false));
        });
};

export const deleteUserById = (id) => (dispatch) => {

    dispatch(setUsersIsFetching(true));

    restAPI.users.deleteUserById(id)
        .then(response => {
            console.info('deleted user: ', response.data);

            dispatch(removeUser(id));

            dispatch(setUsersIsFetching(false));
        });
};

export default UserReducer;