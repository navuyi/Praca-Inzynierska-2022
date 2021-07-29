import React from "react"
import {Route, Redirect} from "react-router-dom"
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
// GuideOnlyRoute components check if user is logged in and if has guide privileges

function GuideOnlyRoute({component: Component, ...rest}){
    console.log("Checking Guide Only Route")

    const is_logged = localStorage.getItem("access_token")
    const guide_status = localStorage.getItem("is_guide")
    let is_guide = false
    if(guide_status == 1){
        is_guide = true
    }


    return (
        (is_logged && is_guide) ?
            <Route {...rest} render={
                props => <Component {...rest} {...props} />
            } />
            : <Redirect push to="/" />
    )
}

export default GuideOnlyRoute