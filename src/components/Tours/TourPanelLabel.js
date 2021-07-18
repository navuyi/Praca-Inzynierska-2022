import React from "react";
import {Row, Col} from "react-bootstrap"

const TourPanelLabel = (props) => {
    return(
        <Row className={"tour-panel-label d-flex align-items-center justify-content-start w-100 flex-sm-row flex-row"}>
            <Col xl={5} xs={5} sm={5} md={5} className={"d-flex flex-row align-items-center"}>
                {props.image}  <p> {props.text} </p>
            </Col>
            <Col xl={7} xs={7} sm={7} md={7}>
                <span> {props.value} </span>
            </Col>
        </Row>
    )
}


export default TourPanelLabel;