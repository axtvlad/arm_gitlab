export const selectMainDocs = (state) => {
    return state.mainDocsDir.mainDocs
}

export const selectMainDocsCount = (state) => {
    return state.mainDocsDir.mainDocsCount
}

export const selectMainDocsIsFetching = (state) => {
    return state.mainDocsDir.isFetching
}

export const selectCurrentMainDoc = (state) => {
    return state.mainDocsDir.currentMainDoc
}
