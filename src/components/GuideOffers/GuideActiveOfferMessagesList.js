import React, {useEffect, useState} from "react"
import {Container, Row, Col, Button, Table} from "react-bootstrap"
import image from "../../images/icons/not_found.svg"
import {useHistory, useParams} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";
import {API_PREFIX} from "../../config";
import axios from "axios";
import {refesh_token} from "../../API_CALLS/api_authentication_token_refresh";
import NotFoundIndicator from "../NotFoundIndicator";
function GuideActiveOfferMessagesList(props){
    const {tourID} = useParams()
    const history = useHistory()
    const [fetching, setFetching] = useState(false)
    const [threads, setThreads] = useState([])

    useEffect(() => {
        fetchThreads()
    }, [])

    function fetchThreads(){
        const url = API_PREFIX+"/messages/guide/offer/threads"
        const access_token = localStorage.getItem("access_token")
        const config = {
            params: {
                tour_id: tourID
            },
            headers:{
                Authorization: `Bearer ${access_token}`
            }
        }
        setFetching(true)
        axios.get(url, config)
            .then(res => {
                setThreads(res.data)
                setFetching(false)
            })
            .catch(err => {
                if(err.response.status === 401){
                    refesh_token().then(res => {
                        localStorage.setItem("access_token", res.data.access_token)
                        fetchThreads()
                    })
                        .catch(err => {
                            history.push("/login")
                        })
                }
            })
    }

    function handleThreadChange(e){
        console.log(e.target.id)
        props.setThreadId(e.target.id)
        props.setMsgVisible(true)

        // Find chosen thread
        const thread = threads.find(thread => thread.thread_id == e.target.id)

        // Interlocutor first and last name
        props.setInterlocutor(thread.f_name + " " + thread.l_name)

        // Set thread sender/receiver ID
        props.setInterlocutorID(thread.interlocutor_id)

        // Thread topic and sent date
        props.setSentDate(thread.creation_date)
        props.setTopic(thread.topic)
    }

    return(
        <React.Fragment>
            {
                fetching ?
                <Row className={"d-flex justify-content-center align-items-center loading-circle-container"}>
                    <CircularProgress size={100}/>
                </Row> :
                threads && threads.length > 0 ?
                    <Row className={"thread-list"}>
                        <Table striped bordered hover responsive={"sm"}  className={"mb-0 w-100"}  >
                            <thead>
                            <tr >
                                <th>#</th>
                                <th>Nadawca</th>
                                <th> Email </th>
                                <th>Tytuł</th>
                                <th>Data</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                threads.map((thread, index) => {
                                    return(
                                        <tr  style={{cursor: "pointer"}} key={index}  >
                                            <td id={thread.thread_id} onClick={handleThreadChange}>{index+1}</td>
                                            <td id={thread.thread_id} onClick={handleThreadChange}> {`${thread.f_name} ${thread.l_name}`} </td>
                                            <td id={thread.thread_id} onClick={handleThreadChange}> {thread.email} </td>
                                            <td id={thread.thread_id} onClick={handleThreadChange}> {thread.topic} </td>
                                            <td id={thread.thread_id} onClick={handleThreadChange}>{thread.creation_date}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </Table>
                    </Row> :
                    <NotFoundIndicator
                        message={"Brak konwersacji dla tej oferty"}
                    />
                }
        </React.Fragment>
    )
}

export default GuideActiveOfferMessagesList