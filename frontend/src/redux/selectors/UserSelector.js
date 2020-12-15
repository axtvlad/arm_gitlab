export const selectUsers = (state) => {
    return state.usersDir.users
}

export const selectUsersCount = (state) => {
    return state.usersDir.typesCount
}

export const selectUsersIsFetching = (state) => {
    return state.usersDir.isFetching
}

export const selectCurrentUser = (state) => {
    return state.usersDir.currentUser
}

export const selectUserIsAdmin = (state) => {
    return state.usersDir.isAdmin
}