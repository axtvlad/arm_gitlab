export const selectRoles = (state) => {
    return state.directories.directories.roles.recordsList
}

export const selectRolesCount = (state) => {
    return state.directories.directories.roles.totalCount
}

export const selectRolesIsFetching = (state) => {
    return state.directories.directories.roles.isFetching
}
