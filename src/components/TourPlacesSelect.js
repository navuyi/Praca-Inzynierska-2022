
import {Fragment} from "react";
import Select from "react-select";
import AsyncSelect from 'react-select/async';
import axios from 'axios';



const mapToValueLabel = (data) => {
    return data.map((item)=>({
        value: item.id, label: item.place
    }))
}

const fetchPlaces = (inputValue, callback) => {
    const data = {
        "place_input": inputValue
    }
    const url = "http://167.99.143.194:5000/get_places_by_input";
    axios.post(url, data)
        .then(res=>{
           callback(mapToValueLabel(res.data));
        })
        .catch(err=>{

        })
}

const handleChange = (selectedOptions) => {
    console.log(selectedOptions);
}

function TourPlacesSelect(){
    return(
        <AsyncSelect
            placeholder="Miejsca, których dotyczy wycieczka"
            isMulti
            loadOptions={fetchPlaces}
            onChange = {handleChange}
        />
    )
}

export default TourPlacesSelect;