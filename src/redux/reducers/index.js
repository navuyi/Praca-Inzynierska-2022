import {combineReducers} from "redux";


// More reducer below in the future
import authenticationReducer from "./authenticationReducer";

const allReducers = combineReducers({
    // ES6 syntax here can be also authReducer: authReducer or <anyname>: authReducer
    authenticationReducer
});

export default allReducers;