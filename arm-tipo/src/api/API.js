import * as axios from "axios";
import {BASE_URL1} from "../env";

const user = "Admin";
const pass = "admin";

const authorizationBasic = window.btoa(user + ':' + pass);

const instance = axios.create({
    headers: {
        "Authorization": "Basic " + authorizationBasic
    },
    baseURL: BASE_URL1
});

export const restAPI = {
    users: {
        getUsers() {
            return instance
                .get('users?loadData=true')
                .then(response => response.data);
        },
        getUserById(userId) {
            return instance
                .get('users/' + userId + '?loadData=true')
                .then(response => response.data);
        },
        deleteUserById(id) {
            return instance
                .delete('users/' + id)
                .then(response => response.data);
        },
        postUser(newUser) {
            return instance
                .post('users', newUser)
                .then(response => response.data)
        }
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
        },
        postCategory(newCategory) {
            return instance
                .post('categories', newCategory)
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
        },
        postFaq(newFaq) {
            return instance
                .post('faqs', newFaq)
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
        },
        postCity(newCity) {
            return instance
                .post('cities', newCity)
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
        },
        postCustomer(newCustomer) {
            return instance
                .post('customers', newCustomer)
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
        },
        postDepartment(newDepartment) {
            return instance
                .post('department', newDepartment)
                .then(response => response.data)
        }
    },

    genders: {
        getGenders() {
            return instance
                .get('genders')
                .then(response => response.data)
        },
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
        },
        postMainDoc(newMainDoc) {
            return instance
                .post('mainDocs', newMainDoc)
                .then(response => response.data)
        }
    },

    otherDocs: {
        getOtherDocs() {
            return instance
                .get('otherDocs')
                .then(response => response.data)
        },
        getOtherDocById(id) {
            return instance
                .get('otherDocs/' + id)
                .then(response => response.data)
        },
        deleteOtherDocById(id) {
            return instance
                .delete('otherDocs/' + id)
                .then(response => response.data)
        },
        postOtherDoc(newOtherDoc) {
            return instance
                .post('otherDocs', newOtherDoc)
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
        },
        postRole(newRole) {
            return instance
                .post('roles', newRole)
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
        },
        postStatus(newStatus) {
            return instance
                .post('statuses', newStatus)
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
        },
        postTemplate(newTemplate) {
            return instance
                .post('templates', newTemplate)
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
        },
        postType(newType) {
            return instance
                .post('types', newType)
                .then(response => response.data)
        }
    },

    rup: {
        getSubjectsHours(params) {
            return instance
                .get('rup?specialization=' + params.specialization + '&semester=' + params.semester)
                .then(response => response.data)
        },
    },

    auth: {
        auth(authData) {
            return instance
                .post('auth', authData)
                .then(response => response.data)
        },
    }
};