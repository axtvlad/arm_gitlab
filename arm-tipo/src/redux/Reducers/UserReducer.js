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
    newUserBirthAt: null,
    newUserIsAdmin: false,
    newUserIsPremium: false,
    newUserIsBanned: false,
    usersCount: 0,
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
                    id: 2,
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
                newUserPhone: action.newPhone
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
        default:
            return state;
    }
};

export const addUserCreator = () => ({
    type: ADD_USER
});

export const updateUserFirstNameCreator = (newFirstName) => ({
    type: UPDATE_USER_FIRSTNAME,
    newFirstName
});

export const updateUserLastNameCreator = (newLastName) => ({
    type: UPDATE_USER_LASTNAME,
    newLastName
});

export const updateUserPatronymicCreator = (newPatronymic) => ({
    type: UPDATE_USER_PATRONYMIC,
    newPatronymic
});

export const updateUserLoginCreator = (newLogin) => ({
    type: UPDATE_USER_LOGIN,
    newLogin
});

export const updateUserPasswordCreator = (newPassword) => ({
    type: UPDATE_USER_PASSWORD,
    newPassword
});

export const updateUserEmailCreator = (newEmail) => ({
    type: UPDATE_USER_EMAIL,
    newEmail
});

export const updateUserPhotoCreator = (newPhoto) => ({
    type: UPDATE_USER_PHOTO,
    newPhoto
});

export const updateUserRoleIdCreator = (newRoleId) => ({
    type: UPDATE_USER_ROLE_ID,
    newRoleId
});

export const updateUserCityIdCreator = (newCityId) => ({
    type: UPDATE_USER_CITY_ID,
    newCityId
});

export const updateUserCustomerIdCreator = (newCustomerId) => ({
    type: UPDATE_USER_CUSTOMER_ID,
    newCustomerId
});

export const updateUserGenderIdCreator = (newGenderId) => ({
    type: UPDATE_USER_GENDER_ID,
    newGenderId
});

export const updateUserPhoneCreator = (newUserPhone) => ({
    type: UPDATE_USER_PHONE,
    newUserPhone
});

export const updateUserLocaleCreator = (newLocale) => ({
    type: UPDATE_USER_LOCALE,
    newLocale
});

export const updateUserBirthAtCreator = (newBirthAt) => ({
    type: UPDATE_USER_BIRTH_AT,
    newBirthAt
});

export const updateUserIsAdminCreator = (newIsAdmin) => ({
    type: UPDATE_USER_IS_ADMIN,
    newIsAdmin
});

export const updateUserIsBannedCreator = (newIsBanned) => ({
    type: UPDATE_USER_IS_BANNED,
    newIsBanned
});

export const updateUserIsPremiumCreator = (newIsPremium) => ({
    type: UPDATE_USER_IS_PREMIUM,
    newIsPremium
});

export const setUsersCreator = (users) => ({
    type: SET_USERS,
    users
});

export const setUsersCountCreator = (usersCount) => ({
    type: SET_USERS_COUNT,
    usersCount
});

export default UserReducer;