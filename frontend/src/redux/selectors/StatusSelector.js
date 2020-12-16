export const selectStatuses = (state) => {
    return state.directories.directories.statuses.recordsList
}

export const selectStatusesCount = (state) => {
    return state.directories.directories.statuses.totalCount
}

export const selectStatusesIsFetching = (state) => {
    return state.directories.directories.statuses.isFetching
}
