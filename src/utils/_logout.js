import {logout, set_as_user, set_user_id} from "../redux/actions";


export function _logout(dispatch) {
    // Clear local storage
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("is_guide")
    localStorage.removeItem("user_id")

    // Clear redux states
    dispatch(logout("LOGOUT"))
    dispatch(set_as_user("SET_AS_USER"))
    dispatch(set_user_id(null)) // <-- null for holding no value, undefined throws an error
}