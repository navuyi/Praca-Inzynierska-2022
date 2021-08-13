import axios from "axios";
import {API_PREFIX} from "../config";


export default function send_response_message(thread_id, receiver_id, content){
    const url = API_PREFIX + "/messages/unicast/response"
    const data = {
        thread_id: thread_id,
        receiver_id: receiver_id,
        content: content
    }
    console.log(data)
    const access_token = localStorage.getItem("access_token")
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }
    return axios.post(url, data, config)
}