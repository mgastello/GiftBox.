export const loggedInRedirect = (redirect, sessionUser) => {

    if (sessionUser) {
        return `/${redirect}`
    } else {
        return '/login'
    }
}