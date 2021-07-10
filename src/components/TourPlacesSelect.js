import AsyncSelect from 'react-select/async';
import axios from 'axios';


const mapToValueLabel = (data) => {
    return data.map((item)=>({
        value: item.id, label: item.place
    }))
}

const fetchTourPlaces = (inputValue, callback) => {
    const data = {
        "place": inputValue
    }
    const url = "http://167.99.143.194:5000/tour/places";
    axios.get(url, {
        params: data
    })
        .then(response => {
            callback(mapToValueLabel(response.data));
        })
        .catch(err => {
            console.log(err);
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
            placeholder="Miejscowość"
            isMulti
            loadOptions={fetchTourPlaces}
            onChange = {handleChange}
            required
        />
    )
}

export default TourPlacesSelect;