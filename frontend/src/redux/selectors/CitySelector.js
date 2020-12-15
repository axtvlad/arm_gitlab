export const selectCities = (state) => {
    return state.citiesDir.cities
}

export const selectCitiesCount = (state) => {
    return state.citiesDir.citiesCount
}

export const selectCitiesIsFetching = (state) => {
    return state.citiesDir.isFetching
}

export const selectCurrentCity = (state) => {
    return state.citiesDir.currentCity
}