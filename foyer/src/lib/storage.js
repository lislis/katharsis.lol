export function saveUserToStore(user) {
    window.localStorage.setItem(
        `${process.env.VUE_APP_LS_PREFIX}user`,
        JSON.stringify(user));
    return true;
};

export function loadUserFromStorage() {
    let storageKey = `${process.env.VUE_APP_LS_PREFIX}user`;
    if (window.localStorage.getItem(storageKey)) {
        return JSON.parse(window.localStorage.getItem(storageKey));
    } else {
        return false
    }
};

export function deleteUserFromStorage() {
    return window.localStorage.removeItem(`${process.env.VUE_APP_LS_PREFIX}user`)
}
