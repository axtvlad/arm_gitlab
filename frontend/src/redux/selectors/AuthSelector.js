export const selectUserData = (state) => {
    return state.authDir.userData
}

export const selectIsAuth = (state) => {
    return state.authDir.isAuth
}

export const selectLogin = (state) => {
    return state.authDir.login
}

export const selectAuthInProcess = (state) => {
    return state.authDir.authInProcess
}

export const selectIsAdmin = (state) => {
    return state.authDir.isAdmin
}