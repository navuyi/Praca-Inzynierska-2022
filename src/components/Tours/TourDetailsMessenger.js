import React, {useState} from "react"
import {Col, Row, Form, Button} from "react-bootstrap"
import Separator from "../Separator";
import SeparatorShort from "../SeparatorShort";
import isEmptyString from "../../utils/isEmptyString";
import message_unicast_new from "../../API_CALLS/message_unicast_new";
import {refesh_token} from "../../API_CALLS/token_refresh";
import {CircularProgress} from "@material-ui/core";

import img from "../../images/icons/success.svg"

function TourDetailsMessenger(props){
    const [content, setContent] = useState("")
    const [topic, setTopic] = useState("")
    const [sending, setSending] = useState(false)
    const [msgSent, setMsgSent] = useState(false)
    function handleSend(){
        // Check if message content is not empty
        if(isEmptyString(content) === true){
            return 1
        }
        setSending(true)
        message_unicast_new(content, props.tour_id, props.guide_id, topic)
            .then(res => {
                setSending(false)
                setMsgSent(true)
                console.log(res)
            })
            .catch(err => {
                if(err.response.status === 401){
                    refesh_token()
                        .then(res =>{
                            localStorage.setItem("access_token", res.data.access_token)
                            handleSend()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                console.log(err.response)
            })
    }

    return(
        <Row className={"tourDetailsMessenger col-xl-8 col-12"} id={"tour-details-messenger"}>
            <Col>
                {
                    msgSent ?
                        <Row className={"sent-success d-flex justify-content-center align-items-center"}>
                            <img src={img} alt={""} width={"100px"}/>
                            <h1>Wiadomość została przesłana pomyślnie</h1>
                        </Row>
                        :
                    <React.Fragment>
                    {
                        sending ?
                            <Row className={"d-flex justify-content-center align-items-center"}>
                                <CircularProgress size={80} style={{margin: "8em 0"}}/>
                            </Row> :
                            <React.Fragment>
                                <Row>
                                    <h1>Wiadomość do przewodnika</h1>
                                </Row>
                                <Row>
                                    <Form.Control
                                        as="input"
                                        placeholder="Tytuł wiadomości"
                                        value={topic}
                                        onChange={(e) => {setTopic(e.target.value)}}
                                    />
                                </Row>
                                <Row className={"mt-4"}>
                                    <Form.Control
                                        as="textarea"
                                        rows={10}
                                        value={content}
                                        placeholder={"Treść wiadomości"}
                                        onChange={(e)=>{setContent(e.target.value)}}
                                    />
                                </Row>
                                <Row className={"d-flex flex-row justify-content-between align-items-center mt-2"}>
                                    <Button  variant={"danger"} onClick={()=>{props.setMsgVisible(false)}} style={{width: "45%"}}> Zamknij </Button>
                                    <Button  variant={"success"} onClick={handleSend} style={{width: "45%"}}> Wyślij </Button>
                                </Row>
                            </React.Fragment>
                    }</React.Fragment>
                }
            </Col>
        </Row>
    )
}

export default TourDetailsMessenger