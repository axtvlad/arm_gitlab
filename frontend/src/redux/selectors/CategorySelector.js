export const selectCategories = (state) => {
    return state.categoriesDir.categories
}

export const selectCategoriesCount = (state) => {
    return state.categoriesDir.categoriesCount
}

export const selectCategoriesIsFetching = (state) => {
    return state.categoriesDir.isFetching
}

export const selectCurrentCategory = (state) => {
    return state.categoriesDir.currentCategory
}