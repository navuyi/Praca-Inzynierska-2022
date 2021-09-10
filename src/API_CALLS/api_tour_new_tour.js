import axios from 'axios';
import {API_PREFIX} from "../config";

export const api_tour_new_tour = (data) => {
    const url = API_PREFIX+"/tour/new_tour";
    const access_token = localStorage.getItem("access_token")

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${access_token}`
        }
    }
    return axios.post(url, data, config);
}