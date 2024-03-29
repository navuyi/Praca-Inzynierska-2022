import React from "react"
import {Col, Row} from "react-bootstrap";


function MessageBox(props) {

    return (
        <div className={`message-box-container ${props.side}`}>
            <Col xl={5} xs={11} className={`messageBox ${props.side}`}>
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
        </div>
    )
}

export default MessageBox