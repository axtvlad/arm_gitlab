export const selectTypes = (state) => {
    return state.directories.directories.types.recordsList
}

export const selectTypesCount = (state) => {
    return state.directories.directories.types.totalCount
}

export const selectTypesIsFetching = (state) => {
    return state.directories.directories.types.isFetching
}
