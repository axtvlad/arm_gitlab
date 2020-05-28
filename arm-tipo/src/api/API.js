import * as axios from "axios";
import {BASE_URL} from "../env";

const user = "Admin";
const pass = "admin";

const authorizationBasic = window.btoa(user + ':' + pass);

const instance = axios.create({
    headers: {
        "Authorization": "Basic " + authorizationBasic
    },
    baseURL: BASE_URL
});

export const restAPI = {
    users: {
        getUsers() {
            return instance
                .get('users?loadData=true')
                .then(response => response.data);

        },
        getUserById(id) {
            return instance
                .get('users?loadData=true/' + id)
                .then(response => response.data);

        },
        deleteUserById(id) {
            return instance
                .delete('users/' + id)
                .then(response => response.data);
        }

        /*
        postNewUser(userData) {
            return instance
                .post('users', {
                        login: 'logidn',
                        password: 'passwdord',
                        firstName: 'test',
                        lastName: 'test',
                        email: 'testsw@mail.ru'
                    }
                )
        }*/
    },

    categories: {
        getCategories() {
            return instance
                .get('categories')
                .then(response => response.data)
        },
        getCategoryById(id) {
            return instance
                .get('categories/' + id)
                .then(response => response.data)
        },
        deleteCategoryById(id) {
            return instance
                .delete('categories/' + id)
                .then(response => response.data)
        }

    },

    faqs: {
        getFaqs() {
            return instance
                .get('faqs')
                .then(response => response.data)
        },
        getFaqById(id) {
            return instance
                .get('faqs/' + id)
                .then(response => response.data)
        },
        deleteFaqById(id) {
            return instance
                .delete('faqs/' + id)
                .then(response => response.data)
        }
    },

    cities: {
        getCities() {
            return instance
                .get('cities')
                .then(response => response.data)
        },
        getCityById(id) {
            return instance
                .get('cities/' + id)
                .then(response => response.data)
        },
        deleteCityById(id) {
            return instance
                .delete('cities/' + id)
                .then(response => response.data)
        }
    },

    customers: {
        getCustomers() {
            return instance
                .get('customers')
                .then(response => response.data)
        },
        getCustomerById(id) {
            return instance
                .get('customers/' + id)
                .then(response => response.data)
        },
        deleteCustomerById(id) {
            return instance
                .delete('customers/' + id)
                .then(response => response.data)
        }
    },

    departments: {
        getDepartments() {
            return instance
                .get('departments')
                .then(response => response.data)
        },
        getDepartmentById(id) {
            return instance
                .get('departments/' + id)
                .then(response => response.data)
        },
        deleteDepartmentById(id) {
            return instance
                .delete('department/' + id)
                .then(response => response.data)
        }
    },

    genders: {
        getGenders() {
            return instance
                .get('genders')
                .then(response => response.data)
        }
    },

    mainDocs: {
        getMainDocs() {
            return instance
                .get('mainDocs')
                .then(response => response.data)
        },
        getMainDocById(id) {
            return instance
                .get('mainDocs/' + id)
                .then(response => response.data)
        },
        deleteMainDocById(id) {
            return instance
                .delete('mainDocs/' + id)
                .then(response => response.data)
        }
    },

    roles: {
        getRoles() {
            return instance
                .get('roles')
                .then(response => response.data)
        },
        getRolesById(id) {
            return instance
                .get('roles/' + id)
                .then(response => response.data)
        },
        deleteRoleById(id) {
            return instance
                .delete('roles/' + id)
                .then(response => response.data)
        }
    },

    statuses: {
        getStatuses() {
            return instance
                .get('statuses')
                .then(response => response.data)
        },
        getStatusById(id) {
            return instance
                .get('statuses/' + id)
                .then(response => response.data)
        },
        deleteStatusById(id) {
            return instance
                .delete('statuses/' + id)
                .then(response => response.data)
        }
    },

    templates: {
        getTemplates() {
            return instance
                .get('templates')
                .then(response => response.data)
        },
        getTemplateById(id) {
            return instance
                .get('templates/' + id)
                .then(response => response.data)
        },
        deleteTemplateById(id) {
            return instance
                .delete('templates/' + id)
                .then(response => response.data)
        }
    },

    types: {
        getTypes() {
            return instance
                .get('types')
                .then(response => response.data)
        },
        getTypeById(id) {
            return instance
                .get('types/' + id)
                .then(response => response.data)
        },
        deleteTypeById(id) {
            return instance
                .delete('types/' + id)
                .then(response => response.data)
        }
    }
};