import {restAPI} from "../../api/API";

const ADD_CUSTOMER = 'add_customer';
const UPDATE_CUSTOMER_NAME_RU = 'update_customer_name_ru';
const UPDATE_CUSTOMER_NAME_KZ = 'update_customer_name_kz';
const SET_CUSTOMERS = 'set_customers';
const SET_CUSTOMERS_COUNT = 'set_customers_count';
const SET_CUSTOMERS_IS_FETCHING = 'set_categories_is_fetching';
const SET_CURRENT_CUSTOMER = 'set_current_customer';

let initialState = {
    customers: [],
    newCustomerNameRu: '',
    newCustomerNameKz: '',
    customersCount: 0,
    isFetching: false,
    currentCustomer: null,
};

const CustomerReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_CUSTOMER:
            return {
                ...state,
                newCustomerNameRu: '',
                newCustomerNameKz: '',
                customers: [...state.customers, {
                    id: 2,
                    name_ru: state.newCustomerNameRu,
                    name_kz: state.newCustomerNameKz,
                }]
            };
        case UPDATE_CUSTOMER_NAME_RU:
            return {
                ...state,
                newCustomerNameRu: action.newNameRu
            };
        case UPDATE_CUSTOMER_NAME_KZ:
            return {
                ...state,
                newCustomerNameKz: action.newNameKz
            };
        case SET_CUSTOMERS:
            return {
                ...state,
                customers: [...state.customers, ...action.customers]
            };
        case SET_CUSTOMERS_COUNT:
            return {
                ...state,
                customersCount: action.customersCount
            };
        case SET_CUSTOMERS_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_CURRENT_CUSTOMER:
            return {
                ...state,
                currentCustomer: action.currentCustomer
            };
        default:
            return state;
    }
};

export const addCustomer = () => ({
    type: ADD_CUSTOMER
});

export const updateCustomerNameRu = (newNameRu) => ({
    type: UPDATE_CUSTOMER_NAME_RU,
    newNameRu
});

export const updateCustomerNameKz = (newNameKz) => ({
    type: UPDATE_CUSTOMER_NAME_KZ,
    newNameKz
});

export const setCustomers = (customers) => ({
    type: SET_CUSTOMERS,
    customers
});

export const setCustomersCount = (customersCount) => ({
    type: SET_CUSTOMERS_COUNT,
    customersCount
});

export const setCustomersIsFetching = (isFetching) => ({
    type: SET_CUSTOMERS_IS_FETCHING,
    isFetching
});

export const setCurrentCustomer = (currentCustomer) => ({
    type: SET_CURRENT_CUSTOMER,
    currentCustomer
});

export const getCustomers = () => {
    return (dispatch) => {

        dispatch(setCustomersIsFetching(true));

        restAPI.customers.getCustomers()
            .then(response => {
                dispatch(setCustomersCount(response.totalCount));
                dispatch(setCustomers(response.data));

                console.info('customers: ', response.data);

                dispatch(setCustomersIsFetching(false));
            });
    }
};

export default CustomerReducer;