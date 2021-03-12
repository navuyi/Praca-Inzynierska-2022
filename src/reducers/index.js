import {combineReducers} from "redux";

// More reducers below in the future
import authReducer from "./authReducer";


const allReducers = combineReducers({
    // ES6 syntax here can be also authReducer: authReducer or <anyname>: authReducer
    authReducer,
})

export default allReducers;