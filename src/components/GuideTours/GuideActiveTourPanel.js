import React from "react"
import {Container, Row, Col} from "react-bootstrap"
import image from "../../images/home/high-res.jpg"
import {limitText} from "../../utils/limitText";
import {API_PREFIX} from "../../config";

function GuideActiveTourPanel(props){
    return(
        <Container  className="guide-active-tour-panel d-flex align-items-center justify-content-center">
            <Row>
                <Col xl={6} className={"d-flex flex-column justify-content-start"}>
                    <Row>
                        <h1> {limitText(props.header, 32)} </h1>
                    </Row>
                    <Row className={"d-flex flex-column justify-content-between align-items-start p-5"} style={{flexGrow: "1"}}>
                        <p> Utworzono: <span>{props.creation_date}</span></p>
                        <p> Zapisanych osób: <span>xx/{props.person_limit}</span>, pozostało <span>XY dni</span> </p>
                        <p> Czas trwania:  od <span>{props.start_date}</span> do <span>{props.end_date}</span> </p>
                        <p> Cena: <span>{props.price}</span> </p>
                    </Row>
                </Col>
                <Col xl={6} className={"d-flex align-items-center justify-content-center"}>
                    <img src={props.image_url} alt={""} width={"100%"}/>
                </Col>
            </Row>
        </Container>
    )
}

export default GuideActiveTourPanel