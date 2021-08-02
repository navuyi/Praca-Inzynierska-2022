import {API_PREFIX} from "../config";
import axios from "axios";

export const refesh_token = async () => {
    const url = API_PREFIX + "/token/refresh"
    const refresh_token = localStorage.getItem("refresh_token")
    const config = {
        headers:{
            Authorization: `Bearer ${refresh_token}`
        }
    }

    return axios.get(url, config)
}