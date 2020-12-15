export const selectTemplates = (state) => {
    return state.templatesDir.templates
}

export const selectTemplatesCount = (state) => {
    return state.templatesDir.templatesCount
}

export const selectTemplatesIsFetching = (state) => {
    return state.templatesDir.isFetching
}

export const selectCurrentTemplate = (state) => {
    return state.templatesDir.currentTemplate
}