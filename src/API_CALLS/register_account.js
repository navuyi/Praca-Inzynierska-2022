import axios from "axios";
import {API_PREFIX} from "../config";

export const register_account = (data) =>{
    const url = API_PREFIX + "/authentication/register"

    return axios.post(url, data, {withCredentials: true})
}




