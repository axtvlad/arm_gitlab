import {DirectoriesTypes} from "./DirectoriesTypes";

const ADD_ROLE = 'addNewRole';
const ADD_CATEGORY = 'addNewCategory';
const ADD_CITY = 'addNewCity';
const ADD_CUSTOMER = 'addNewCustomer';
const ADD_DEPARTMENT = 'addNewDepartment';
const ADD_FAQ = 'addNewFaq';
const ADD_MAIN_DOC = 'addNewMainDoc';
const ADD_STATUS = 'addNewStatus';
const ADD_TYPES = 'addNewType';
const ADD_USER = 'addNewUser';
const ADD_NEW_RECORD = 'addNewRecord';

export const GetAddButtonText = (directory_type) => {
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
        case DirectoriesTypes.TYPES:
            return ADD_TYPES;
        case DirectoriesTypes.USERS:
            return ADD_USER;
        case DirectoriesTypes.STATUSES:
            return ADD_STATUS;
        default:
            return ADD_NEW_RECORD;
    }
};