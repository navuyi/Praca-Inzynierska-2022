import React from "react";
import {Container, Row, Col} from "react-bootstrap";

function HomeTourPanel(props){
    return(
        <div className="homeTourPanel">
            <img src={props.image} alt={""}/>
            <h1> {props.title}</h1>
            <p> {props.description} </p>
        </div>
    );
}

export default HomeTourPanel;