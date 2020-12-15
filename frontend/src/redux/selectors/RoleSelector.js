export const selectRoles = (state) => {
    return state.rolesDir.roles
}

export const selectRolesCount = (state) => {
    return state.rolesDir.rolesCount
}

export const selectRolesIsFetching = (state) => {
    return state.rolesDir.isFetching
}

export const selectCurrentRole = (state) => {
    return state.rolesDir.currentRole
}