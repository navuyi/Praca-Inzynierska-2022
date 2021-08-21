import React from "react"
import {Redirect, Route} from "react-router-dom"
import {useDispatch} from "react-redux";
import {_logout} from "../../utils/_logout";

// GuideOnlyRoute components check if user is logged in and if has guide privileges

function GuideOnlyRoute({component: Component, ...rest}) {
    console.log("Checking Guide Only Route")
    const dispatch = useDispatch()
    const is_logged = localStorage.getItem("access_token")
    const guide_status = localStorage.getItem("is_guide")
    let is_guide = false
    if (guide_status == 1) {
        is_guide = true
    }

    if (!is_logged) {
        _logout(dispatch)
    }


    return (
        (is_logged && is_guide) ?
            <Route {...rest} render={
                props => <Component {...rest} {...props} />
            }/>
            : <Redirect push to="/"/>
    )
}

export default GuideOnlyRoute