const authenticationReducer = (state = false, action) =>{
    switch(action.type){
        case "LOGIN":
            return true;
        case "LOGOUT":
            return false;
        default: return state;
        // the default above returns state when we only want to know the state value (and not change anything)
    }
};

export default authenticationReducer;