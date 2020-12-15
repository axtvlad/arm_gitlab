export const selectDepartments = (state) => {
    return state.departmentsDir.departments
}

export const selectDepartmentsCount = (state) => {
    return state.departmentsDir.departmentsCount
}

export const selectDepartmentsIsFetching = (state) => {
    return state.departmentsDir.isFetching
}

export const selectCurrentDepartment = (state) => {
    return state.departmentsDir.currentDepartment
}