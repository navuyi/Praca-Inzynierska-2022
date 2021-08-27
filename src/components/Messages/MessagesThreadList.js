import React, {useEffect, useState} from "react";
import {Button, Col, DropdownButton, FormControl, FormLabel, Row, Table} from "react-bootstrap"
import api_messages_general_threads from "../../API_CALLS/api_messages_general_threads";
import {refesh_token} from "../../API_CALLS/api_authentication_token_refresh";
import {CircularProgress} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {limitText} from "../../utils/limitText";

import NotFoundIndicator from "../ReusableComponents/NotFoundIndicator";
import DropdownItem from "react-bootstrap/DropdownItem";
import delete_thread from "../../API_CALLS/api_messages_thread_delete";
import {_logout} from "../../utils/_logout";
import restore_thread from "../../API_CALLS/api_messages_thread_restore";
import {Pagination} from "@material-ui/lab";

function MessagesThreadList(props) {
    const history = useHistory()
    const [threads, setThreads] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [sort, setSort] = useState("most_recent")

    useEffect(() => {
        fetchThreads()
    }, [])
    useEffect(() => {
        fetchThreads()
    }, [props.threadType])
    useEffect(() => {
        fetchThreads()
    }, [page, sort])

    function fetchThreads() {
        setLoading(true)
        const thread_type = Object.keys(props.threadType).find(key => props.threadType[key] === true)
        console.log(thread_type)
        api_messages_general_threads(thread_type, page, sort)
            .then(res => {
                setLoading(false)
                setThreads(res.data.threads)
                setTotalPages(res.data.pages)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) {
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

    function handlePage(e, value){
        if(value === page){
            return
        }
        setPage(value)
    }

    function navigateTourDetails(e) {
        history.push(`/tours/tour?id=${e.target.id}`)
    }

    function handleThreadChange(e) {
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

    function deleteThread(e){
        // Find thread to delete
        const thread = threads.find(thread => thread.thread_id == e.target.id)
        delete_thread(thread.thread_id)
            .then(res => {
                console.log(res)
                fetchThreads()
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
                if(err.response.status === 401){
                    history.push("/login")
                    _logout()
                }
            })
    }

    function restoreThread(e){
        // Find thread to restore
        const thread = threads.find(thread => thread.thread_id == e.target.id)
        restore_thread(thread.thread_id)
            .then(res => {
                console.log(res)
                fetchThreads()
            })
            .catch(err => {
                console.log(err)
                if(err.response.status === 401){
                    history.push("/login")
                    _logout()
                }
            })
    }

    return (
            <React.Fragment>
                <Row className={"thread-list-header d-flex justify-content-center align-items-center mt-5"}>
                    <Col xl={3}> </Col>
                    <Col xl={6}>
                        <h1> {props.threadType.active ? "Aktywne wątki " : null} {props.threadType.deleted ? "Usunięte wątki" : null}</h1>
                    </Col>
                    <Col xl={3}>
                        {
                            threads.length > 0 ?
                                <React.Fragment>
                                    <FormLabel> Sortuj </FormLabel>
                                    <FormControl as={"select"} value={sort} onChange={(e)=>{setSort(e.target.value)}}>
                                        <option value={"most_recent"}> Od najnowszych </option>
                                        <option value={"oldest"}> Od najstarszych </option>
                                    </FormControl>
                                </React.Fragment>
                                        :
                                null
                        }
                    </Col>
                </Row>
                {
                    threads.length > 0 ?
                <React.Fragment>
                    <Row className={"thread-list"}>
                        {
                            loading ?
                                <Row className={"loading-box"}>
                                    <CircularProgress size={100}/>
                                </Row>
                                :
                                <Table striped bordered hover responsive={"sm"} className={"mb-0 w-100"}>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Rozmówca</th>
                                        <th> Email</th>
                                        <th >Tytuł wątku</th>
                                        <th > Oferta</th>
                                        <th >Data</th>
                                        <th  > </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        threads.map((thread, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td onClick={handleThreadChange}
                                                        id={thread.thread_id}> {index + 1} </td>
                                                    <td onClick={handleThreadChange}
                                                        id={thread.thread_id}> {`${thread.interlocutor_fname} ${thread.interlocutor_lname}`} </td>
                                                    <td onClick={handleThreadChange}
                                                        id={thread.thread_id}> {thread.interlocutor_email} </td>
                                                    <td onClick={handleThreadChange}
                                                        id={thread.thread_id}> {limitText(thread.topic, 30)} </td>
                                                    <td><Button id={thread.tour_id} className={"w-100"} variant={'dark'}
                                                                onClick={navigateTourDetails}> {limitText(thread.tour_header, 20)} </Button>
                                                    </td>
                                                    <td onClick={handleThreadChange}
                                                        id={thread.thread_id}> {thread.creation_date} </td>
                                                    <td>
                                                        <DropdownButton title={"Opcje"} variant={"dark"} className={"btn w-100"}>
                                                            <DropdownItem id={thread.thread_id} onClick={handleThreadChange}> Pokaż wątek </DropdownItem>
                                                            {
                                                                props.threadType.deleted ? null :  <DropdownItem id={thread.thread_id} onClick={deleteThread}> Usuń wątek </DropdownItem>
                                                            }
                                                            {
                                                                !props.threadType.deleted ? null : <DropdownItem id={thread.thread_id} onClick={restoreThread}> Przywróć wątek </DropdownItem>
                                                            }
                                                        </DropdownButton>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </Table>
                                }
                    </Row>
                    <Row className={"thread-list-pagination d-flex justify-content-center align-items-center"}>
                        <Pagination count={totalPages} page={page} shape="rounded" color={"primary"} onChange={handlePage}/>
                    </Row>
                </React.Fragment>
                        :
                <NotFoundIndicator message={"Brak usuniętych wątków"}/>
                }
            </React.Fragment>
    )
}

export default MessagesThreadList