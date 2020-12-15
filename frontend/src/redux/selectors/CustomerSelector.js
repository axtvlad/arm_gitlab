export const selectCustomers = (state) => {
    return state.customersDir.customers
}

export const selectCustomersCount = (state) => {
    return state.customersDir.customersCount
}

export const selectCustomersIsFetching = (state) => {
    return state.customersDir.isFetching
}

export const selectCurrentCustomer = (state) => {
    return state.customersDir.currentCustomer
}