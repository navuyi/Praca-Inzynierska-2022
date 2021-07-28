const guideStatusReducer = (state = false, action) =>{
    switch(action.type){
        case "SET_AS_GUIDE":
            return true;
        case "SET_AS_USER":
            return false;
        default: return state;
        // the default above returns state when we only want to know the state value (and not change anything)
    }
};


export default guideStatusReducer;