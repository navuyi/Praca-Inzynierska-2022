import axios from "axios";
import {API_PREFIX} from "../config";


export default function restore_thread(thread_id){
    const url = API_PREFIX + "/messages/thread/restore"
    const access_token = localStorage.getItem("access_token")
    const data = {
        thread_id: thread_id
    }
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }

    return axios.patch(url, data, config)
}