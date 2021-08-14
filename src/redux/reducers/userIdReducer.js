const userIdReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER_ID':
            return action.payload
        default:
            return state
    }
}

export default userIdReducer