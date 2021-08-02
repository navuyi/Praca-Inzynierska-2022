import React from "react"
import {Container, Row, Col} from "react-bootstrap";
import image from "../../images/home/high-res.jpg"

function GuideActiveTourPanel(props){
    return(
        <Container  className="guide-active-tour-panel">
            <Row>
                <Col xl={6} className={"d-flex flex-column justify-content-start"}>
                    <Row>
                        <h1> Limited header of the t... </h1>
                    </Row>
                    <Row className={"d-flex flex-column justify-content-center align-items-start pl-5 pr-5 mt-5"} style={{flexGrow: "1"}}>
                        <p> Zapisanych osób: <span>xx/YY</span>, pozostało <span>XY dni</span> </p>
                        <p> Czas trwania:  od <span>dd/mm/YY</span> do <span>dd/mm/YY</span> </p>
                        <p> Cena: <span>xyz</span> </p>
                    </Row>
                </Col>
                <Col xl={6}>
                    <img src={image} alt={""} width={"100%"}/>
                </Col>
            </Row>
        </Container>
    )
}

export default GuideActiveTourPanel