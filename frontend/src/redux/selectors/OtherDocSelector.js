export const selectOtherDocs = (state) => {
    return state.otherDocsDir.otherDocs
}

export const selectOtherDocsCount = (state) => {
    return state.otherDocsDir.otherDocsCount
}

export const selectOtherDocsIsFetching = (state) => {
    return state.otherDocsDir.isFetching
}

export const selectCurrentOtherDoc = (state) => {
    return state.otherDocsDir.currentOtherDoc
}