export const selectIsAuth = (state) => {
    return state.authDir.isAuth
}

export const selectLogin = (state) => {
    return state.authDir.login
}

export const selectEmail = (state) => {
    return state.authDir.email
}

export const selectIsAdmin = (state) => {
    return state.authDir.isAdmin
}