import React from "react"
import {Container, Row, Button, Col} from "react-bootstrap"
import {limitText} from "../../utils/limitText";



function GuideActiveOfferHeader(props){
    return(
        <Row className={"guideActiveOfferHeader mt-5 mt-xl-0"}>
            <Col xl={7}>
                <Row className={"pl-xl-3"}>
                    <Col>
                        <h1> {limitText(props.header, 32)} </h1>
                    </Col>
                </Row>
                <Row className={"d-flex flex-row align-items-start pl-xl-3 pt-xl-5"}>
                    <Col xl={6}>
                        <p> Zapisanych: <span>xx/{props.person_limit}</span> </p>
                        <p> Cena: <span>{props.price}</span></p>
                        <p> Czas trwania: od <span>{props.start_date}</span> do <span>{props.end_date}</span></p>
                    </Col>
                    <Col xl={6} >
                        <Button className={"w-100"} variant={"danger"}> Zakończ zapisy </Button>
                    </Col>
                </Row>
            </Col>
            <Col xl={5}>
                <Row>
                    <img src={props.image_url} alt="" />
                </Row>
            </Col>
        </Row>
    )
}

export default GuideActiveOfferHeader