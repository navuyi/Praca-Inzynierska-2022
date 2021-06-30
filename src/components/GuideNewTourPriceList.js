import React from "react";
import {Row, Col, Container, Form, Button} from "react-bootstrap"

export default function GuideNewTourPriceList(props){

    return(
        <React.Fragment >
            <Row className={"mt-5"}>
                <Col>
                    <h2 style={{textAlign: "center"}}> Cennik </h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p style={{textAlign: "center"}}> Proszę wypisać pozycje, które są lub nie są wliczone w cenę wycieczki </p>
                </Col>
            </Row>
            <Row className={"d-flex justify-content-around"}>
                <Col xl={5}>
                    <Row>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            style={{resize: "none"}}
                        />
                    </Row>
                    <Row className={"d-flex justify-content-between mt-4"}>
                        <Button className={"btn-success"}> Wliczone </Button>
                        <Button className={"btn-danger"}> Nie wliczone </Button>
                    </Row>
                </Col>
                <Col xl={5}>
                    <div className={"price-list"}>
                        {
                            props.priceList.map((item, index) => {
                                let style;
                                item.variant ? style={backgroundColor: "#5cb85c"} : style={backgroundColor: "#d9534f"}
                                return(
                                    <div key={index} className={"price-list-element"} style={style}>
                                        {item.text}
                                    </div>
                                )
                            })
                        }
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    )
}