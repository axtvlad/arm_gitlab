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
    return state.searchDir.searchMode
}

export const selectSearchNum = (state) => {
    return state.searchDir.num
}