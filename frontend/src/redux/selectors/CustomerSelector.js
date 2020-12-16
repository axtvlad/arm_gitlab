export const selectCustomers = (state) => {
    return state.directories.directories.customers.recordsList
}

export const selectCustomersCount = (state) => {
    return state.directories.directories.customers.totalCount
}

export const selectCustomersIsFetching = (state) => {
    return state.directories.directories.customers.isFetching
}
