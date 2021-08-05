import React from "react"
import {Container, Row, Button, Col} from "react-bootstrap"
import {limitText} from "../../utils/limitText";



function GuideActiveOfferHeader(props){
    return(
        <Row className={"guideActiveOfferHeader mt-5 mt-xl-0"}>
            <Col xl={7}>
                <Row className={"pl-xl-3"}>
                    <Col>
                        <h1> {limitText("Lorem ipsum septum sempra totem amorum ev lorem ipsum torem", 32)} </h1>
                    </Col>
                </Row>
                <Row className={"d-flex flex-row align-items-start pl-xl-3 pt-xl-5"}>
                    <Col xl={6}>
                        <p> Zapisanych: <span>xx/yy</span> </p>
                        <p> Cena: <span>XYZ</span></p>
                        <p> Czas trwania: od <span>dd/mm/YY</span> do <span>dd/mm/YY</span></p>
                    </Col>
                    <Col xl={6} >
                        <Button className={"w-100"} variant={"danger"}> Zakończ zapisy </Button>
                    </Col>
                </Row>
            </Col>
            <Col xl={5}>
                <Row>
                    <img src="http://167.99.143.194/storage/tour_images/12:86e967db-372a-48c8-8013-b03c8a86b16e.jpg" alt="" />
                </Row>
            </Col>
        </Row>
    )
}

export default GuideActiveOfferHeader