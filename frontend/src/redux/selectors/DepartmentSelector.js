export const selectDepartments = (state) => {
    return state.directories.directories.departments.recordsList
}

export const selectDepartmentsCount = (state) => {
    return state.directories.directories.departments.totalCount
}

export const selectDepartmentsIsFetching = (state) => {
    return state.directories.directories.departments.isFetching
}
