import {API_PREFIX} from "../config";
import axios from "axios";


export default function api_messages_thread_messages(thread_id, offset){
    const url = API_PREFIX + "/messages/thread/messages"
    const access_token = localStorage.getItem("access_token")
    const config = {
        params: {
            thread_id: thread_id,
            offset: offset
        },
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }

    return axios.get(url, config)
}