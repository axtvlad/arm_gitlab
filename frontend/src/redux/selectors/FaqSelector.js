export const selectFaqs = (state) => {
    return state.faqsDir.faqs
}

export const selectFaqsCount = (state) => {
    return state.faqsDir.faqsCount
}

export const selectFaqsIsFetching = (state) => {
    return state.faqsDir.isFetching
}

export const selectCurrentFaq = (state) => {
    return state.faqsDir.currentFaq
}
