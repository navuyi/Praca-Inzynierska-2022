import {combineReducers} from "redux";


// More reducer below in the future
import authenticationReducer from "./authenticationReducer";
import guideStatusReducer from "./guideStatusReducer";
import userIdReducer from "./userIdReducer";

const allReducers = combineReducers({
    // ES6 syntax here can be also authReducer: authReducer or <anyname>: authReducer
    isAuthenticated: authenticationReducer,
    isGuide: guideStatusReducer,
    setUserID: userIdReducer
});

export default allReducers;