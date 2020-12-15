export const selectGenders = (state) => {
    return state.gendersDir.genders
}

export const selectGendersIsFetching = (state) => {
    return state.gendersDir.isFetching
}