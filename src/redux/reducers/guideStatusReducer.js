const guideStatusReducer = (state = true, action) =>{
    switch(action.type){
        case "SET_AS_GUIDE":
            return true;
            break;
        case "SET_AS_USER":
            return false;
            break;
        default: return state;
        // the default above returns state when we only want to know the state value (and not change anything)
    }
};


export default guideStatusReducer;