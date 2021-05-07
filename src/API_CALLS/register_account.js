import axios from "axios";


export const register_account = (data) =>{
    const url = "http://167.99.143.194:5000/register";

    return axios.post(url, data, {withCredentials: true})
}




