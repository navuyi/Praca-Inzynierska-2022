import {API_PREFIX} from "../config";
import axios from "axios";

export default function api_messages_unicast_new(content, tour_id, receiver_id, topic) {
    const url = API_PREFIX + "/messages/unicast/new"
    const access_token = localStorage.getItem("access_token")
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }
    const data = {
        content: content,
        tour_id: tour_id,
        receiver_id: receiver_id,
        topic: topic
    }

    return axios.post(url, data, config)
}