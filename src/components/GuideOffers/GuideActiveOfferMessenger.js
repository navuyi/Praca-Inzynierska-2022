import React, {useEffect, useState} from "react"
import {Row, Col, Button, FormControl, Form} from "react-bootstrap"

import MessageBox from "../MessageBox";
import CloseIcon from '@material-ui/icons/Close';
import get_thread_messages from "../../API_CALLS/get_thread_messages";
import {refesh_token} from "../../API_CALLS/token_refresh";
import {useHistory} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";
import isEmptyString from "../../utils/isEmptyString";
import send_response_message from "../../API_CALLS/send_response_message";

function GuideActiveOfferMessenger(props){
    const history = useHistory()
    const [msgOffset, setMsgOffset] = useState(0)
    const [messages, setMessages] = useState([])
    const [fetching, setFetching] = useState(false)

    const [response, setResponse] = useState("")

    useEffect(() => {
        fetchMessages(msgOffset)
        console.log(props)
    }, [])
    useEffect(() => {
        fetchMessages(msgOffset)

    }, [props.threadId])

    function fetchMessages(){
        setFetching(true)
       get_thread_messages(props.threadId, msgOffset)
           .then(res => {
               console.log(res.data)
               setMessages(res.data)
               setFetching(false)
           })
           .catch(err => {
               console.log(err.response)
               if(err.response.status === 401){
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

    function sendResponse(){
        if(isEmptyString(response)){
            return
        }
        send_response_message(props.threadId, props.interlocutorID, response)
            .then(res => {
                console.log(res)
                setResponse("")
                fetchMessages()
            })
            .catch(err => {
                console.log(err.response)
                if(err.response.status === 401){
                    refesh_token().then(res => {
                        localStorage.setItem("access_token", res.data.access_token)
                    }).catch(err => {
                        history.push("/login")
                    })
                }
            })
    }

    function handleChange(e){
        setResponse(e.target.value)
    }

    return(
        <div className={"guideActiveOfferMessenger"}>
            <Row className={"d-flex flex-row justify-content-between align-items-center messenger-header"} >
                <p> Nadawca: {props.interlocutor}</p>
                <p> Tytuł: {props.topic}</p>
                <p> Nadano: {props.sentDate}</p>
                <CloseIcon fontSize={"large"} className={"messenger-close-icon"} onClick={()=>{props.setMsgVisible(false)}}/>
            </Row>

            <div className={"messenger-body"} >
                {
                    fetching ?
                        <Row className={"d-flex justify-content-center align-items-center"} style={{minHeight: "300px"}}>
                            <CircularProgress  size={100} />
                        </Row>
                         :
                        <React.Fragment>
                            {
                                messages.map((msg, index) => {
                                    let sender = ""
                                    if(msg.side === "left"){
                                        sender = props.interlocutor
                                    }
                                    else if(msg.side === "right"){
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
                        </React.Fragment>
                }
            </div>

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
        </div>
    )
}

export default  GuideActiveOfferMessenger