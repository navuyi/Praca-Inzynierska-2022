import axios from "axios";
import {API_PREFIX} from "../config";

export default function api_messages_general_threads() {
    const url = API_PREFIX + "/messages/general/threads"
    const access_token = localStorage.getItem("access_token")
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }
    return axios.get(url, config)
}