import axios from 'axios';

export const create_tour = (data) => {
    const url = "http://167.99.143.194:5000/new_tour";
    const config = {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }
    return axios.post(url, data, config);
}