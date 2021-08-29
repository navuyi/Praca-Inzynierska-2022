import React from "react"
import {Col, Form, FormControl, FormLabel, Row} from "react-bootstrap";


function OfferDetails(props){

    function handleChange(e){

    }
    return (
        <React.Fragment>
            <Row className={"mt-5 col-xl-8"}>
                <FormLabel className={"m-0"}> Nagłówek wycieczki </FormLabel>
                <FormControl
                    as={"textarea"}
                    rows={2}
                    disabled={props.disabled}
                    value={props.general_data.header? props.general_data.header : ""}
                    onChange={handleChange}
                />
            </Row>
            <Row className={"mt-4 col-xl-8"}>
                <FormLabel className={"m-0"}> Opis wycieczki</FormLabel>
                <FormControl
                    as={"textarea"}
                    rows={8}
                    disabled={props.disabled}
                    value={props.general_data.description? props.general_data.description : ""}
                    onChange={handleChange}
                />
            </Row>
            <Row className={"mt-4 col-xl-8"}>
                <h3 className={"m-0"}> Dane szczegółowe</h3>
            </Row>
            <Row className={"mt-4 col-xl-8 d-flex justify-content-between"}>
                <Col xl={5} className={"p-0"}>
                    <FormLabel className={"m-0"}> Ilość miejsc </FormLabel>
                    <FormControl
                        as={"input"}
                        type={"number"}
                        rows={8}
                        disabled={props.disabled}
                        value={props.general_data.person_limit ? props.general_data.person_limit : ""}
                        onChange={handleChange}
                    />
                </Col>
                <Col xl={5} className={"p-0"}>
                    <FormLabel className={"m-0"}> Cena </FormLabel>
                    <FormControl
                        as={"input"}
                        type={"number"}
                        disabled={props.disabled}
                        value={props.general_data.price ? props.general_data.price : ""}
                        onChange={handleChange}
                    />
                </Col>
            </Row>
            <Row className={"mt-4 col-xl-8 d-flex justify-content-between"}>
                <Col xl={5} className={"p-0"}>
                    <FormLabel className={"m-0"}> Data rozpoczęcia </FormLabel>
                    <FormControl
                        as={"input"}
                        type={"date"}
                        disabled={props.disabled}
                        value={props.general_data.start_date ? props.general_data.start_date : ""}
                        onChange={handleChange}
                    />
                </Col>
                <Col xl={5} className={"p-0"}>
                    <FormLabel className={"m-0"}> Data zakończenia </FormLabel>
                    <FormControl
                        as={"input"}
                        type={"date"}
                        disabled={props.disabled}
                        value={props.general_data.end_date ? props.general_data.end_date : ""}
                        onChange={handleChange}
                    />
                </Col>
            </Row>
            <Row className={"mt-4 col-xl-8 d-flex justify-content-between"}>
                <Col xl={5} className={"p-0"}>
                    <FormLabel className={"m-0"}> Data końca zapisów </FormLabel>
                    <FormControl
                        as={"input"}
                        type={"date"}
                        disabled={props.disabled}
                        value={props.general_data.enrollment_date ? props.general_data.enrollment_date : ""}
                        onChange={handleChange}
                    />
                </Col>
                <Col xl={5} className={"p-0"}>
                    <FormLabel className={"m-0"}> Godzina końca zapisów </FormLabel>
                    <FormControl
                        as={"input"}
                        type={"time"}
                        rows={8}
                        disabled={props.disabled}
                        value={props.general_data.enrollment_time ? props.general_data.enrollment_time : ""}
                        onChange={handleChange}
                    />
                </Col>
            </Row>
            <Row className={"mt-4 col-xl-8 d-flex justify-content-between"}>
                <FormLabel> Miejsca </FormLabel>
                <FormControl
                    as={"select"}
                />
                {/* TODO Tour Places Select Here */}
            </Row>
        </React.Fragment>
    );
}

export default OfferDetails