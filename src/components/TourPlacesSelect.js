
import {Fragment} from "react";
import Select from "react-select";
import AsyncSelect from 'react-select/async';
import axios from 'axios';



const mapToValueLabel = (data) => {
    return data.map((item)=>({
        value: item.id, label: item.place
    }))
}

const fetchTourPlaces = (inputValue, callback) => {
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



function TourPlacesSelect(props){
    const handleChange = (selectedOptions) => {
        const tmp_places = [];
        selectedOptions.map((item)=>{
            tmp_places.push(item.value);
        })
        const update = {...props.tourData, ["tour_places"]: tmp_places}
        props.setTourData(update);
    }
    return(
        <AsyncSelect
            placeholder="Miejsca, których dotyczy wycieczka"
            isMulti
            loadOptions={fetchTourPlaces}
            onChange = {handleChange}
        />
    )
}

export default TourPlacesSelect;