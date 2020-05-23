const CATEGORIES = 'categories';
const CITIES = 'cities';
const CUSTOMERS = 'customers';
const DEPARTMENTS = 'departments';
const FAQS = 'faqs';
const MAIN_DOCS = 'main_docs';
const ROLES = 'roles';
const USERS = 'users';
const STATUSES = 'statuses';
const TYPES = 'types';
const GENDERS = 'genders';

const CATEGORY = 'category';
const CITY = 'city';
const CUSTOMER = 'customer';
const DEPARTMENT = 'department';
const FAQ = 'faq';
const MAIN_DOC = 'main_doc';
const ROLE = 'role';
const USER = 'user';
const STATUS = 'status';
const TYPE = 'type';
const GENDER = 'gender';

export const DirectoriesTypes = {
    CATEGORIES,
    CITIES,
    CUSTOMERS,
    DEPARTMENTS,
    FAQS,
    MAIN_DOCS,
    ROLES,
    USERS,
    TYPES,
    STATUSES,
    GENDERS
};

export const GetDirectory = (directory_type) => {
    switch (directory_type) {
        case DirectoriesTypes.CATEGORIES: return CATEGORY;
        case DirectoriesTypes.DEPARTMENTS: return DEPARTMENT;
        case DirectoriesTypes.FAQS: return FAQ;
        case DirectoriesTypes.MAIN_DOCS: return MAIN_DOC;
        case DirectoriesTypes.CITIES: return CITY;
        case DirectoriesTypes.CUSTOMERS: return CUSTOMER;
        case DirectoriesTypes.ROLES: return ROLE;
        case DirectoriesTypes.USERS: return USER;
        case DirectoriesTypes.STATUSES: return STATUS;
        case DirectoriesTypes.TYPES: return TYPE;
        case DirectoriesTypes.GENDERS: return GENDER;
        default: return 'none'
    }
};