export const selectCategories = (state) => {
    return state.directories.directories.categories.recordsList
}

export const selectCategoriesCount = (state) => {
    return state.directories.directories.categories.totalCount
}

export const selectCategoriesIsFetching = (state) => {
    return state.directories.directories.categories.isFetching
}
