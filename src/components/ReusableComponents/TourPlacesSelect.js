import AsyncSelect from 'react-select/async';
import axios from 'axios';
import {API_PREFIX} from "../../config";


export const mapToValueLabel = (data) => {
    return data.map((item) => ({
        value: item.id, label: item.place
    }))
}

export const fetchTourPlaces = (inputValue, callback) => {
    const data = {
        "place": inputValue
    }
    const url = API_PREFIX+"/tour/places";
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


function TourPlacesSelect(props) {

    const handleChange = (selectedOptions) => {
        const tmp_places = [];
        selectedOptions.map((item) => {
            tmp_places.push(item.value);
        })

        const update = {...props.tourData, ["tour_places"]: tmp_places}
        props.setTourData(update);
    }
    const style = props.style;
    return (
        <AsyncSelect
            placeholder="Miejscowość"
            isMulti
            loadOptions={fetchTourPlaces}
            onChange={handleChange}
            required
            style={style}
        />
    )
}

export default TourPlacesSelect;