import axios from "axios";
import {API_PREFIX} from "../config";

export default function api_messages_general_threads(thread_type, page) {
    const url = API_PREFIX + "/messages/general/threads"
    const access_token = localStorage.getItem("access_token")
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`
        },
        params:{
            thread_type: thread_type,
            page: page
        }
    }
    return axios.get(url, config)
}