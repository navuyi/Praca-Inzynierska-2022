import {login, set_as_guide, set_as_user, set_user_id} from "../redux/actions";

export function _login(access_token, refresh_token, user_id, is_guide, dispatch, history) {
    localStorage.setItem("access_token", access_token)
    localStorage.setItem("refresh_token", refresh_token)
    localStorage.setItem("is_guide", is_guide)
    localStorage.setItem("user_id", user_id)


    // Set user status
    if (is_guide == 1) {
        dispatch(set_as_guide("SET_AS_GUIDE"))
    } else if (is_guide == 0) {
        dispatch(set_as_user("SET_AS_USER"))
    }
    // Set user ID
    dispatch(set_user_id(user_id))

    // Set authentication status to logged in
    dispatch(login("LOGIN"))

    // Push to after login landing page <-- for now /account/user
    if (is_guide == 0) {
        history.push("/account/user/enrollments")
    } else if (is_guide == 1) {
        history.push("/account/guide/new-tour")
    }

}