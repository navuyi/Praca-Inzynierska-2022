import React from 'react'
import {Col, Form, Row} from "react-bootstrap";


function GuideNewTourElectivesSelector(props) {

    const handleChange = (e) => {
        const isChecked = e.target.checked;
        const update = {...props.electives, [e.target.id]: isChecked}
        props.setElectives(update);
    }
    return (
        <React.Fragment>
            <Row className={"d-flex justify-content-center"}>
                <Col
                    className={"d-flex flex-column flex-sm-column flex-md-row justify-content-around align-items-center"}>
                    <Form.Check id="priceList" value={props.electives.priceList} type="checkbox" label="Cennik"
                                style={{transform: "scale(1.2)", marginTop: "1em"}} onChange={handleChange}/>

                    <Form.Check id="importantInfo" value={props.electives.importantInfo} type="checkbox"
                                label="Ważne informacje" style={{transform: "scale(1.2)", marginTop: "1em"}}
                                onChange={handleChange}/>

                    <Form.Check id="imageGallery" value={props.electives.imageGallery} type="checkbox"
                                label="Galeria zdjęć" style={{transform: "scale(1.2)", marginTop: "1em"}}
                                onChange={handleChange}/>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default GuideNewTourElectivesSelector;

