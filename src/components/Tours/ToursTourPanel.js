import React from "react"
import {Container, Row, Col, Button} from "react-bootstrap"
import image from "../../images/home/tour01.jpg"

const ToursTourPanel = (props) => {


    return(
        <Row className={"toursTourPanel"}>
            <Col xl={5} className={"d-flex flex-column align-items-center justify-content-center"}>
                <img src={image} alt={""} className={"tour-panel-main-img"}/>
            </Col>
            <Col xl={7}>
                <Row>
                    <h1 className={"tour-panel-header"}> Tour header</h1>
                </Row>
                <Row>
                    <Col xl={6}>
                        <p className={"tour-panel-description"}>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                        </p>
                    </Col>
                    <Col xl={6} className={"tour-panel-info d-flex flex-column align-items-center justify-content-center"}>
                        <p></p>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default ToursTourPanel