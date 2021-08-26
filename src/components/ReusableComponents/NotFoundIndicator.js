import image from "../../images/icons/not_found.svg";
import {Row} from "react-bootstrap";
import React from "react";


function NotFoundIndicator(props) {
    return (
        <Row className={"notFoundIndicator d-flex flex-column justify-content-center align-items-center mb-5"}>
            <img src={image} alt={""} width={100}/>
            <h1> {props.message} </h1>
        </Row>
    )
}

export default NotFoundIndicator