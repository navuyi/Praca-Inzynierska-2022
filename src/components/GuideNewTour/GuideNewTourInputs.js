import {Button, Col, Form, FormControl, Row} from "react-bootstrap";
import TourPlacesSelect from "../ReusableComponents/TourPlacesSelect";
import Separator from "../ReusableComponents/Separator";
import React from "react"

function GuideNewTourInputs(props) {

    const handleMainImageChange = (e) => {
        // Set image to display
        props.setMainUrl(URL.createObjectURL(e.target.files[0]));

        // Add image to FormData
        props.formData.set('main_image', e.target.files[0], e.target.files[0].name);
    }
    return (
        <React.Fragment>
            <Row className={"d-flex justify-content-center"}>
                <Col xl={8} lg={8}>
                    <h2 style={{textAlign: "left", color: "#222222"}}> Nagłówek wycieczki </h2>
                    <FormControl
                        as="textarea"
                        id="header"
                        maxlength={250}
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
                    <h2 style={{textAlign: "left", color: "#222222"}}> Opis wycieczki </h2>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Miejsce na opis wycieczki"
                        onChange={props.handleChange}
                        id="description"
                        maxlength={1024}
                        value={props.tourData.description}
                        required
                    />
                </Col>
            </Row>
            <Separator/>
            <Row className={"d-flex justify-content-center"}>
                <h2 style={{textAlign: "center", color: "#222222"}}> Zdjęcie główne </h2>
            </Row>
            <Row className={"d-flex justify-content-center align-items-center flex-column "}>
                <Col xl={6} lg={6} className={"d-flex justify-content-center"}>
                    <Button variant={"outline-primary"} className={"w-100"} onClick={() => {
                        document.getElementById("main-img-input").click()
                    }}> Dodaj zdjęcie główne</Button>
                    <FormControl
                        type="file"
                        onChange={handleMainImageChange}
                        accept="image/*"
                        id="main-img-input"
                        style={{display: "none"}}
                    />
                </Col>
                <Col xl={6} lg={6}>
                    <img src={props.mainUrl} alt={""}
                         style={{maxWidth: "100%", marginTop: "1em", borderRadius: "0.5em"}}/>
                </Col>
            </Row>
            <Separator/>
            <Row className={"d-flex justify-content-center"}>
                <h2 style={{textAlign: "center", color: "#222222"}}> Dane szczegółowe </h2>
            </Row>
            <Row className={"d-flex justify-content-center"}>
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
            <Row className={"d-flex justify-content-center mt-xl-5"}>
                <h2 style={{textAlign: "center", color: "#222222"}}> Ostateczny termin zapisów </h2>
            </Row>
            <Row className={"d-flex justify-content-center mt-2"}>
                <Col xl={3} lg={4} >
                    <h6> Data </h6>
                    <FormControl
                        id="enrollment_deadline_date"
                        onChange={props.handleChange}
                        type="date"
                        value={props.tourData.enrollment_deadline_date}
                        required
                    />
                </Col>
                <Col xl={3} lg={4} >
                    <h6> Godzina </h6>
                    <FormControl
                        id="enrollment_deadline_time"
                        onChange={props.handleChange}
                        type="time"
                        value={props.tourData.enrollment_deadline_time}
                        required
                    />
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default GuideNewTourInputs;