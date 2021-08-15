import React, {useEffect, useState, useRef} from "react"
import {Button, FormControl, Row} from "react-bootstrap"
import CloseIcon from '@material-ui/icons/Close';
import api_messages_thread_messages from "../../API_CALLS/api_messages_thread_messages";
import {refesh_token} from "../../API_CALLS/api_authentication_token_refresh";
import {useHistory} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";
import isEmptyString from "../../utils/isEmptyString";
import api_messages_unicast_response from "../../API_CALLS/api_messages_unicast_response";
import MessageBox from "./MessageBox";
import {limitText} from "../../utils/limitText";


function Messenger(props) {
    const messagesEnd = useRef(null)
    const history = useHistory()
    const [msgOffset, setMsgOffset] = useState(0)
    const [messages, setMessages] = useState([])
    const [fetching, setFetching] = useState(false)
    const [response, setResponse] = useState("")

    // Fetch messages on every component render
    useEffect(() => {
        fetchMessages(msgOffset)
    }, [])
    // Fetch messages every time thread ID changes <-- linked to thread list component - deleting/restoring threads
    useEffect(() => {
        fetchMessages(msgOffset)
    }, [props.thread_id])


    function fetchMessages() {
        setFetching(true)
        api_messages_thread_messages(props.thread_id, msgOffset)
            .then(res => {
                console.log(res.data)
                setMessages(res.data)
                setMsgOffset(res.data.length)
                setFetching(false)
            })
            .catch(err => {
                console.log(err.response)
                if (err.response.status === 401) {
                    refesh_token().then(res => {
                        localStorage.setItem("access_token", res.data.access_token)
                        fetchMessages(msgOffset)
                    })
                        .catch(err => {
                            history.push("/login")
                        })
                }
            })
    }

    function sendResponse() {
        if (isEmptyString(response)) {
            return
        }
        if(props.threadType && props.threadType.deleted == true){
            const tmp = props.threadType
            tmp.deleted = false
            tmp.active = true
            props.setThreadType(tmp)
        }
        api_messages_unicast_response(props.thread_id, props.interlocutor_id, response)
            .then(res => {
                console.log(res)
                setResponse("")
                fetchMessages()
            })
            .catch(err => {
                console.log(err.response)
                if (err.response.status === 401) {
                    refesh_token().then(res => {
                        localStorage.setItem("access_token", res.data.access_token)
                    }).catch(err => {
                        history.push("/login")
                    })
                }
            })
    }
    function handleChange(e) {
        setResponse(e.target.value)
    }
    function scrollToBottom(){
        messagesEnd.current?.scrollIntoView({behavior: "smooth"})
    }
    useEffect(() => {
        scrollToBottom()
    }, [messages])
    return (
        <div className={"messenger"}>
            <Row className={"d-flex flex-row justify-content-between align-items-center messenger-header"}>
                <p> Rozmówca: {props.interlocutor}</p>
                <p> Tytuł: {limitText(props.topic, 30)}</p>
                <p> Nadano: {props.sentDate}</p>
                <CloseIcon fontSize={"large"} className={"messenger-close-icon"} onClick={() => {
                    props.setMsgVisible(false)
                }}/>
            </Row>
            <Row>
            </Row>
            <div className={"messenger-body"}>
                {
                    fetching ?
                        <Row className={"d-flex justify-content-center align-items-center"}
                             style={{minHeight: "300px"}}>
                            <CircularProgress size={100}/>
                        </Row>
                        :
                        <div >
                            <Row className={"w-100 mt-2 d-flex justify-content-center align-items-center"}>
                                <Button variant={"danger"} className={"w-75"} onClick={fetchMessages}> Załaduj więcej </Button>
                            </Row>
                            {
                                messages.map((msg, index) => {
                                    let sender = ""
                                    if (msg.side === "left") {
                                        sender = props.interlocutor
                                    } else if (msg.side === "right") {
                                        sender = "Ty"
                                    }
                                    return (
                                        <MessageBox key={index}
                                                side={msg.side}
                                                sender={sender}
                                                send_time={`${msg.creation_date} ${msg.creation_time}`}
                                                content={msg.content}
                                        />
                                    )
                                })
                            }
                            <div ref={messagesEnd} />
                        </div>
                }
            </div>
            <Row>
            </Row>
            {
                props.threadType && props.threadType.deleted == true ? null :
                <Row className={"message-input-box d-flex flex-column justify-content-center align-items-center w-100"}>
                    <FormControl
                        as='textarea'
                        rows={5}
                        placeholder={"Napisz coś"}
                        className={"w-75 align-self-center"}
                        value={response}
                        onChange={handleChange}
                    />
                    <Button className={"w-75 mt-5"} variant={"info"} onClick={sendResponse}> Wyślij </Button>
                </Row>
            }

        </div>
    )
}

export default Messenger