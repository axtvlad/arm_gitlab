export const selectCities = (state) => {
    return state.directories.directories.cities.recordsList
}

export const selectCitiesCount = (state) => {
    return state.directories.directories.cities.totalCount
}

export const selectCitiesIsFetching = (state) => {
    return state.directories.directories.cities.isFetching
}
