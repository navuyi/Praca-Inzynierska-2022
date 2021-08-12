import React, {useEffect, useState} from "react"
import {Row, Col, Button, FormControl, Form} from "react-bootstrap"

import MessageBox from "../MessageBox";
import CloseIcon from '@material-ui/icons/Close';
import get_thread_messages from "../../API_CALLS/get_thread_messages";
import {refesh_token} from "../../API_CALLS/token_refresh";
import {useHistory} from "react-router-dom";

function GuideActiveOfferMessenger(props){
    const history = useHistory()
    const [msgOffset, setMsgOffset] = useState(0)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        fetchMessages(msgOffset)
    }, [])

    function fetchMessages(){
       get_thread_messages(props.threadId, msgOffset)
           .then(res => {
               console.log(res.data)
               setMessages(res.data)
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
                <Button variant={"warning"}> Więcej </Button>
                {
                    messages.map((msg, index) => {
                        return (
                            <MessageBox
                                side={msg.side}
                                sender={props.interlocutor}
                                send_time={msg.send_time}
                                content={msg.content}
                            />
                        )
                    })
                }

            </div>
            <Row className={" m-0 mt-5"}>
                <FormControl
                    as='textarea'
                />
            </Row>
        </div>
    )
}

export default  GuideActiveOfferMessenger