import React from "react"
import {Container, Row, Col, Button, Form} from "react-bootstrap"
import GuideActiveTourPanel from "../../components/GuideTours/GuideActiveTourPanel";

function GuideActiveOffers(){
    return(
        <div className="guideActiveOffers">
            <Container>
                <Row className={"header-tab d-flex justify-content-around flex-column align-items-center flex-lg-row"}>
                    <Col xl={3} xs={8}>
                        <label> Sortowanie </label>
                        <Form.Control as={"select"} className={"w-100"} >
                            <option value="2">Od najnowszych</option>
                            <option value="3">Od najstarszych</option>
                        </Form.Control>
                    </Col>
                    <Col xl={3} xs={8}>
                        <label> Data początkowa </label>
                        <Form.Control
                           type="date"
                        />
                    </Col>
                    <Col xl={3} xs={8}>
                        <label> Data końcowa </label>
                        <Form.Control
                            type="date"
                        />
                    </Col>
                </Row>
                <Row className={"d-flex flex-column align-items-center mt-5"}>
                    <GuideActiveTourPanel />
                    <GuideActiveTourPanel />

                    <GuideActiveTourPanel />

                </Row>
            </Container>
        </div>
    )
}

export default GuideActiveOffers