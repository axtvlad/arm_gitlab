export const selectStatuses = (state) => {
    return state.statusesDir.statuses
}

export const selectStatusesCount = (state) => {
    return state.statusesDir.statusesCount
}

export const selectStatusesIsFetching = (state) => {
    return state.statusesDir.isFetching
}

export const selectCurrentStatus = (state) => {
    return state.statusesDir.currentStatus
}