import axios from "axios";
import {API_PREFIX} from "../config";



export function create_enrollment(data){
    const url = API_PREFIX+"/enrollments/enrollment"
    const access_token = localStorage.getItem("access_token")

    if(!access_token){
        return axios.post(url, data)
    }else{
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
        return axios.post(url, data, config)
    }
}

export function get_enrollments(tour_id){
    const url = API_PREFIX+"/enrollments/enrollment"
    const access_token = localStorage.getItem("access_token")
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        params: {
            tour_id: tour_id
        }
    }
    return axios.get(url, config)
}