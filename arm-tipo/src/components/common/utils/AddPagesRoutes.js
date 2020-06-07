import {DirectoriesTypes} from "./DirectoriesTypes";

const ADD_ROLE = '/addRole';
const ADD_CATEGORY = '/addCategory';
const ADD_CITY = '/addCity';
const ADD_CUSTOMER = '/addCustomer';
const ADD_DEPARTMENT = '/addDepartment';
const ADD_FAQ = '/addFaq';
const ADD_MAIN_DOC = '/addMainDoc';
const ADD_OTHER_DOC = '/addOtherDoc';
const ADD_STATUS = '/addStatus';
const ADD_TYPES = '/addType';
const ADD_USER = '/addUser';

export const GetAddAddress = (directory_type) => {
    switch (directory_type) {
        case DirectoriesTypes.CATEGORIES:
            return ADD_CATEGORY;
        case DirectoriesTypes.CITIES:
            return ADD_CITY;
        case DirectoriesTypes.CUSTOMERS:
            return ADD_CUSTOMER;
        case DirectoriesTypes.ROLES:
            return ADD_ROLE;
        case DirectoriesTypes.FAQS:
            return ADD_FAQ;
        case DirectoriesTypes.DEPARTMENTS:
            return ADD_DEPARTMENT;
        case DirectoriesTypes.MAIN_DOCS:
            return ADD_MAIN_DOC;
        case DirectoriesTypes.OTHER_DOCS:
            return ADD_OTHER_DOC;
        case DirectoriesTypes.TYPES:
            return ADD_TYPES;
        case DirectoriesTypes.USERS:
            return ADD_USER;
        case DirectoriesTypes.STATUSES:
            return ADD_STATUS;
        default:
            return '/';
    }
};