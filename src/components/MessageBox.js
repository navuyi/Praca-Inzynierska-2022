import React from "react"
import {Col, Row} from "react-bootstrap";


function MessageBox(props){

    return(
        <Col xl={5} xs={10} className={`messageBox ${props.side}`}>
            <Row className={"pl-4 pr-4 pt-4 d-flex flex-row justify-content-between align-items-center"}>
                <h1>{props.sender}</h1>
                <p> {props.send_time}</p>
            </Row>
            <Row className={"p-4"}>
                <p className={"content"}>
                    {props.content}
                </p>
            </Row>
        </Col>
    )
}

export default MessageBox