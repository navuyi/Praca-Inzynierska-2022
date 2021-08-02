import React from "react"
import {Route, Redirect, useHistory} from "react-router-dom"
import {useSelector} from "react-redux";
import {_logout} from "../utils/_logout";
import {useDispatch} from "react-redux";

// Protected route checks only if user is logged in
// For checking full privileges use GuideOnlyRoute component

function ProtectedRoute({component: Component, ...rest}){
    const dispatch = useDispatch()
    const access_token = localStorage.getItem("access_token")
    let is_logged = false
    if(access_token){
       is_logged = true
    }
    else{
        _logout(dispatch)
    }

    return (
        is_logged ?
        <Route {...rest} render={
            props => <Component {...rest} {...props} />
        } />
            : <Redirect push to="/login" />
    )
}

export default ProtectedRoute