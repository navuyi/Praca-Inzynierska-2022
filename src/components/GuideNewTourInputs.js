import {Row, FormControl, FormGroup, Col, Form} from "react-bootstrap";
import TourPlacesSelect from "./TourPlacesSelect";

import React from "react"

function GuideNewTourInputs(props){

    const handleMainImageChange = (e) => {
        // Set image to display
        props.setMainUrl(URL.createObjectURL(e.target.files[0]));

        // Add image to FormData
        props.formData.set('main_image', e.target.files[0], e.target.files[0].name);
    }
    return(
        <React.Fragment>
            <Row className={"d-flex justify-content-center"}>
                <Col xl={8} lg={8}>
                    <h2 style={{textAlign: "left", color: "#1d6cf5"}}> Nagłówek wycieczki </h2>
                    <FormControl
                        as="textarea"
                        id="header"
                        onChange={props.handleChange}
                        rows={1}
                        placeholder="Nagłówek wycieczki"
                        value={props.tourData.header}
                        required
                    />
                </Col>
            </Row>
            <Row className={"d-flex justify-content-center mt-4"}>
                <Col xl={8} lg={8}>
                    <h2 style={{textAlign: "left", color: "#1d6cf5"}}> Opis wycieczki </h2>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Miejsce na opis wycieczki"
                        onChange={props.handleChange}
                        id="description"
                        value={props.tourData.description}
                        required
                    />
                </Col>
            </Row>
            <Row className={"d-flex justify-content-center mt-5"}>
                <h2 style={{textAlign: "center", color: "#1d6cf5"}}> Zdjęcie główne </h2>
            </Row>
            <Row className={"d-flex justify-content-center align-items-center flex-column mb-5 mt-2"}>
                <Col xl={6} lg={6} className={"d-flex justify-content-center"}>
                    <input
                        type="file"
                        onChange={handleMainImageChange}
                        accept="image/*"
                        required
                    />
                </Col>
                <Col xl={6} lg={6}>
                    <img src={props.mainUrl} alt={""} style={{maxWidth: "100%", marginTop: "1em", borderRadius: "0.5em"}}/>
                </Col>
            </Row>
            <Row className={"d-flex justify-content-center mt-5 mb-2"}>
                <h2 style={{textAlign: "center", color: "#1d6cf5"}}> Dane szczegółowe </h2>
            </Row>
            <Row className={"d-flex justify-content-center mt-1 "}>
                <Col xl={3} lg={4} className={"d-flex flex-column"}>
                    <h6> Ilość miejsc</h6>
                    <FormControl
                        type="text"
                        id="person_limit"
                        onChange={props.handleChange}
                        placeholder="Ilość miejsc"
                        value={props.tourData.person_limit}
                        required
                    />
                    <h6> Cena</h6>
                    <FormControl
                        id="price"
                        onChange={props.handleChange}
                        placeholder="Cena wycieczki na osobę"
                        type="text"
                        value={props.tourData.price}
                        required
                    />
                </Col>
                <Col xl={3} lg={4}>
                    <h6> Data rozpoczęcia </h6>
                    <FormControl
                        id="start_date"
                        onChange={props.handleChange}
                        placeholder="Cena wycieczki na osobę"
                        type="date"
                        value={props.tourData.start_date}
                        required
                    />
                    <h6> Data zakończenia </h6>
                    <FormControl
                        id="end_date"
                        onChange={props.handleChange}
                        placeholder="Cena wycieczki na osobę"
                        type="date"
                        value={props.tourData.end_date}
                        required
                    />
                </Col>
                <Col xl={3} lg={4}>
                    <h6> Miejsce </h6>
                    <TourPlacesSelect
                        setTourData={props.setTourData}
                        tourData={props.tourData}
                        required
                    />
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default GuideNewTourInputs;