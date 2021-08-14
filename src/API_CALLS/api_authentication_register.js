import axios from "axios";
import {API_PREFIX} from "../config";

export const api_authentication_register = (data) =>{
    const url = API_PREFIX + "/authentication/register"

    return axios.post(url, data, {withCredentials: true})
}




