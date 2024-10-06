export const isLoggedIn = (redirect, sessionUser) => {

    if (sessionUser) {
        return `/${redirect}`
    } else {
        return '/login'
    }
}