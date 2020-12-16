export const selectGenders = (state) => {
    return state.directories.directories.genders.recordsList
}

export const selectGendersCount = (state) => {
    return state.directories.directories.genders.totalCount
}

export const selectGendersIsFetching = (state) => {
    return state.directories.directories.genders.isFetching
}
