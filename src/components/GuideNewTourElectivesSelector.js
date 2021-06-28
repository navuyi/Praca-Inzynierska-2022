import React from 'react'
import {Row, FormControl, FormGroup, Col, Form} from "react-bootstrap";



function GuideNewTourElectivesSelector(){
    return(
        <React.Fragment>
            <Row className={"d-flex flex-row justify-content-around mt-3"}>
                <Col xl={4} className={"d-flex justify-content-center"}>
                    <Form.Check type="checkbox" label="Cennik" style={{transform: "scale(1.3)"}}/>
                </Col>
                <Col xl={4} className={"d-flex justify-content-center"}>
                    <Form.Check type="checkbox" label="Ważne informacje" style={{transform: "scale(1.3)"}}/>
                </Col>
                <Col xl={4} className={"d-flex justify-content-center"}>
                    <Form.Check type="checkbox" label="Galeria zdjęć" style={{transform: "scale(1.3)"}}/>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default GuideNewTourElectivesSelector;

