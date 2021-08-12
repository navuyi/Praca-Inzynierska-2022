import React, {useEffect, useState} from "react"
import {Row, Col, Button, FormControl, Form} from "react-bootstrap"

import MessageBox from "../MessageBox";
import CloseIcon from '@material-ui/icons/Close';
import get_thread_messages from "../../API_CALLS/get_thread_messages";
import {refesh_token} from "../../API_CALLS/token_refresh";
import {useHistory} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";

function GuideActiveOfferMessenger(props){
    const history = useHistory()
    const [msgOffset, setMsgOffset] = useState(0)
    const [messages, setMessages] = useState([])
    const [fetching, setFetching] = useState(false)

    useEffect(() => {
        fetchMessages(msgOffset)
    }, [])

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
                       fetchMessages()
                   })
                       .catch(err => {
                           history.push("/login")
                       })
               }
           })
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
                    fetching ? <CircularProgress  size={100} /> :
                        <React.Fragment>
                            <Button variant={"warning"} className={"m-3 w-50 align-self-center"}> Więcej </Button>
                            {
                                messages.map((msg, index) => {
                                return (
                                <MessageBox key={index}
                                side={msg.side}
                                sender={props.interlocutor}
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
                />
                <Button className={"w-75 mt-5"} variant={"success"}> Wyślij </Button>
            </Row>
        </div>
    )
}

export default  GuideActiveOfferMessenger