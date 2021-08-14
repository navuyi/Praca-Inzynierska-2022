import React, {useEffect, useState} from "react";
import {Row, Col, Container, Button, Table} from "react-bootstrap"
import api_messages_general_threads from "../../API_CALLS/api_messages_general_threads";
import {refesh_token} from "../../API_CALLS/api_authentication_token_refresh";
import {CircularProgress} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {limitText} from "../../utils/limitText";

import NotFoundIndicator from "../NotFoundIndicator";


function MessagesThreadList(props){
    const history = useHistory()
    const [threads, setThreads] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetchThreads()
    }, [])

    function fetchThreads(){
        setLoading(true)
       api_messages_general_threads()
           .then(res => {
               setLoading(false)
               setThreads(res.data)
               console.log(res.data)
           })
           .catch(err => {
               console.log(err)
               if(err.response.status === 401){
                   refesh_token().then(res => {
                       localStorage.setItem("access_token", res.data.access_token)
                       fetchThreads()
                   }).catch(err => {
                       console.log(err)
                       history.push("/login")
                   })
               }
           })
    }

    function navigateTourDetails(e){
        history.push(`/tours/tour?id=${e.target.id}`)
    }

    function handleThreadChange(e){
        props.setThreadId(e.target.id)
        props.setMsgVisible(true)
        // Find chosen thread
        const thread = threads.find(thread => thread.thread_id == e.target.id)

        // Interlocutor first and last name
        props.setInterlocutor(thread.interlocutor_fname + " " + thread.interlocutor_lname)

        // Set thread sender/receiver ID
        props.setInterlocutorID(thread.interlocutor_id)

        // Thread topic and sent date
        props.setSentDate(thread.creation_date)
        props.setTopic(thread.topic)
    }

    return(
        <React.Fragment>

                {
                    loading ?
                    <Row className={"loading-box"}>
                        <CircularProgress size={100} />
                    </Row> :
                    threads.length > 0 ?
                    <Row className={"thread-list"}>
                        <Table striped bordered hover responsive={"sm"}  className={"mb-0 w-100"}  >
                            <thead>
                            <tr >
                                <th>#</th>
                                <th>Rozmówca</th>
                                <th> Email </th>
                                <th>Tytuł wątku</th>
                                <th> Oferta </th>
                                <th>Data</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                threads.map((thread, index) => {
                                    return(
                                        <tr key={index}>
                                            <td onClick={handleThreadChange} id={thread.thread_id} > {index+1} </td>
                                            <td onClick={handleThreadChange} id={thread.thread_id} > {`${thread.interlocutor_fname} ${thread.interlocutor_lname}`} </td>
                                            <td onClick={handleThreadChange} id={thread.thread_id} > {thread.interlocutor_email} </td>
                                            <td onClick={handleThreadChange} id={thread.thread_id} > {limitText(thread.topic, 30)} </td>
                                            <td > <Button id={thread.tour_id} className={"w-100"} variant={'dark'} onClick={navigateTourDetails}> {limitText(thread.tour_header, 20)} </Button> </td>
                                            <td onClick={handleThreadChange} id={thread.thread_id} > {thread.creation_date} </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </Table>
                    </Row> :
                    <NotFoundIndicator
                        message={"Brak konwersacji"}
                    />
                }
        </React.Fragment>
    )
}

export default MessagesThreadList