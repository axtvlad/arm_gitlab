import {restAPI} from "../../api/API";

const SET_CUSTOMERS = 'set_customers';
const SET_CUSTOMERS_COUNT = 'set_customers_count';
const SET_CUSTOMERS_IS_FETCHING = 'set_categories_is_fetching';
const SET_CURRENT_CUSTOMER = 'set_current_customer';

const initialState = {
    customers: [],
    customersCount: 0,
    isFetching: false,
    currentCustomer: null,
};

export const CustomerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CUSTOMERS:
            return {
                ...state,
                customers: action.customers
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

const setCustomers = (customers) => ({
    type: SET_CUSTOMERS,
    customers
});

const setCustomersCount = (customersCount) => ({
    type: SET_CUSTOMERS_COUNT,
    customersCount
});

const setCustomersIsFetching = (isFetching) => ({
    type: SET_CUSTOMERS_IS_FETCHING,
    isFetching
});

const setCurrentCustomer = (currentCustomer) => ({
    type: SET_CURRENT_CUSTOMER,
    currentCustomer
});

export const getCustomers = () => async (dispatch) => {
    dispatch(setCustomersIsFetching(true));

    const res = await restAPI.customers.getCustomers()

    dispatch(setCustomersCount(res.totalCount));
    dispatch(setCustomers(res.data));
    dispatch(setCustomersIsFetching(false));
};

export const getCustomerById = (id) => async (dispatch) => {
    const res = await restAPI.customers.getCustomerById(id)

    dispatch(setCurrentCustomer(res.data));
};

export const postCustomer = (formData) => async (dispatch) => {
    await restAPI.customers.postCustomer(formData)

    dispatch(getCustomers())
};

export const deleteCustomerById = (id) => async (dispatch) => {
    await restAPI.customers.deleteCustomerById(id)

    dispatch(getCustomers())
};

export const updateCustomer = (id, data) => async (dispatch) => {
    await restAPI.customers.updateCustomer(id, data)

    dispatch(getCustomerById(id))
};