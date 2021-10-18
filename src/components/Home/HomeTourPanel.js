import React from "react";
import {useHistory} from "react-router-dom";

function HomeTourPanel(props) {
    const history = useHistory()

    function handleRedirect(){
        history.push(`/tours/tour/${props.tour_id}`)
    }

    return (
        <div className="homeTourPanel" onClick={handleRedirect}>
            <img src={props.image} alt={""}/>
            <h1> {props.title}</h1>
            <p> {props.description} </p>
        </div>
    );
}

export default HomeTourPanel;