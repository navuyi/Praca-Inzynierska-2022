import React from "react";
import {Slider} from "@material-ui/core";

function ToursPriceSlider(props){

    function handleChange(e, newValue){
        props.setTourPrice(newValue)
        console.log(newValue)
    }

    return(
        <Slider
            id="tour-price"
            min={20}
            max={1000}
            step={1}
            onChange={handleChange}
            value={props.tourPrice}
            color={"secondary"}
            valueLabelDisplay="auto"
        />
    )
}

export default ToursPriceSlider