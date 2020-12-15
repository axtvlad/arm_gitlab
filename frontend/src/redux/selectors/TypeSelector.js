export const selectTypes = (state) => {
    return state.typesDir.types
}

export const selectTypesCount = (state) => {
    return state.typesDir.typesCount
}

export const selectTypesIsFetching = (state) => {
    return state.typesDir.isFetching
}

export const selectCurrentType = (state) => {
    return state.typesDir.currentType
}