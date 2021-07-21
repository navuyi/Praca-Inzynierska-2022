import React from "react";
import {Slider} from "@material-ui/core";

function ToursPriceSlider(props){

    function handleChange(e, newValue){
        const update = {...props.filterData, tour_price: newValue}
        props.setFilterData(update)
    }

    return(
        <Slider
            id="tour-price"
            min={20}
            max={1000}
            step={1}
            onChange={handleChange}
            value={props.filterData.tour_price}
            color={"secondary"}
            valueLabelDisplay="auto"
        />
    )
}

export default ToursPriceSlider