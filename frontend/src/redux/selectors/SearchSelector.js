export const selectSearchResults = (state) => {
    return state.searchDir.results
}

export const selectSearchTags = (state) => {
    return state.searchDir.tags
}

export const selectSearchIsSearching = (state) => {
    return state.searchDir.isSearching
}

export const selectSearchMode = (state) => {
    return state.rolesDir.searchMode
}

export const selectSearchNum = (state) => {
    return state.rolesDir.num
}