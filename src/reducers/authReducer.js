const authReducer = (state = false, action) => {
    switch(action.type){
        case 'LOGIN':
            return true;
            break;
        case 'LOGOUT':
            return false;
            break;
        default: return state;
        // the default above returns state when we only want to know the state value (and not change anything)
    }
};

export default authReducer;