export const login = () => {
    return {
        type: "LOGIN"
    }
}
export const logout = () => {
    return {
        type: "LOGOUT"
    }
}

export const set_as_guide = () => {
    return {
        type: "SET_AS_GUIDE"
    }
}
export const set_as_user = () => {
    return {
        type: "SET_AS_USER"
    }
}

export const set_user_id = (userID) => {
    return {
        type: 'SET_USER_ID',
        payload: userID
    }
}