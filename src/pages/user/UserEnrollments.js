import React from "react"
import {Button, Col, Container, Row} from "react-bootstrap";

import img from "../../images/home/tour03.jpg"
import settings from "../../images/icons/settings.svg"

function UserEnrollments() {

    const arr = [1,2,3]

    return (
        <div className={"userEnrollments"}>
            <Container className={"h-100"} style={{marginTop: "0", top: "0", flexGrow: "1"}}>
                <Row className={"header d-flex justify-content-center"}>
                    <h1> Twoje aktywne zapisy </h1>
                </Row>
                <Row className={"d-flex justify-content-center mb-5"}>
                    <Col xl={10}>
                        {
                            arr.map((item, index) => {
                                return(
                                    <Row className={"enrollment-panel"} key={index}>
                                        <Col xl={5}>
                                            <img id={"tour-img"} src={img} alt={""} />
                                        </Col>
                                        <Col xl={7} className={"d-flex flex-column align-items-start justify-content-start"}>
                                            <Row className={"d-flex flex-row justify-content-between align-items-center w-100"}>
                                                <h2> Loreim ipsum set dorim </h2>
                                            </Row>
                                            <Row className={"flex-grow-1 d-flex flex-column justify-content-center"} >
                                                <p>Przewodnik: </p>
                                                <p> Data: </p>
                                                <p> Status płatności: </p>
                                                {
                                                    index%2 === 0 ? <Button variant={"danger"} className={""}> Dokonaj płatności </Button> : null
                                                }
                                            </Row>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserEnrollments