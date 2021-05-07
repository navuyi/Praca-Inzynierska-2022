import {combineReducers} from "redux";


// More reducer below in the future
import authenticationReducer from "./authenticationReducer";
import guideStatusReducer from "./guideStatusReducer";

const allReducers = combineReducers({
    // ES6 syntax here can be also authReducer: authReducer or <anyname>: authReducer
    isAuthenticated: authenticationReducer,
    isGuide: guideStatusReducer,
});

export default allReducers;