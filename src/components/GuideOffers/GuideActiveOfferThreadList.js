import React, {useEffect, useState} from "react"
import {FormControl, Row, Table, Col, Form, FormLabel} from "react-bootstrap"
import {useHistory, useParams} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";
import {API_PREFIX} from "../../config";
import axios from "axios";
import {refesh_token} from "../../API_CALLS/api_authentication_token_refresh";
import NotFoundIndicator from "../ReusableComponents/NotFoundIndicator";
import {Pagination} from "@material-ui/lab";

function GuideActiveOfferThreadList(props) {
    const {tourID} = useParams()
    const history = useHistory()
    const [fetching, setFetching] = useState(false)
    const [threads, setThreads] = useState([])
    const [page, setPage] = useState(1)
    const [pagesTotal, setPagesTotal] = useState(5)
    const [sort, setSort] = useState("most_recent")
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetchThreads()
    }, [])
    useEffect(() => {
        fetchThreads()
    }, [page, sort])
    useEffect(() => {
        setPage(1)
        fetchThreads()
        console.log(search)
    }, [search])

    const handlePage = (e, value) => {
        setPage(value)
    }

    function fetchThreads() {
        const url = API_PREFIX + "/messages/guide/offer/threads"
        const access_token = localStorage.getItem("access_token")
        const config = {
            params: {
                tour_id: tourID,
                page: page,
                sort: sort,
                search: search
            },
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
        setFetching(true)
        axios.get(url, config)
            .then(res => {
                setThreads(res.data.threads)
                setPagesTotal(res.data.pages_total)
                setFetching(false)
                console.log(res.data)
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        refesh_token().then(res => {
                            localStorage.setItem("access_token", res.data.access_token)
                            fetchThreads()
                        })
                            .catch(err => {
                                history.push("/login")
                            })
                    }
                }
            })
    }

    function handleThreadChange(e) {
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

    return (
        <React.Fragment>
            <Row className={"mt-5 list-header d-flex  align-items-center justify-content-center"}>
                <Col xl={3}>
                    <FormLabel>Wyszukaj</FormLabel>
                    <FormControl as={"input"} placeholder={"Imię i nazwisko, email, ..."} value={search} onChange={(e)=> {setSearch(e.target.value)}}/>
                </Col>
                <Col xl={6}>
                    <h1> Wiadomości </h1>
                </Col>
                <Col xl={3}>
                    <FormLabel>Sortuj</FormLabel>
                    <FormControl as={"select"} onChange={(e) => {
                        setSort(e.target.value)
                    }} value={sort}>
                        <option value={"most_recent"}> Od najnowszych</option>
                        <option value={"oldest"}> Od najstarszych</option>
                    </FormControl>
                </Col>
            </Row>
            {
                fetching ?
                    <Row className={"d-flex justify-content-center align-items-center loading-circle-container"}>
                        <CircularProgress size={100}/>
                    </Row> :
                    <React.Fragment>
                        <Row className={"thread-list"}>
                            <Table striped bordered hover responsive={"sm"} className={"mb-0 w-100 h-100"}>
                                {
                                    threads.length > 0 ?
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Rozmówca</th>
                                            <th> Email</th>
                                            <th>Tytuł</th>
                                            <th>Data</th>
                                        </tr>
                                        </thead> : null
                                }
                                <tbody>
                                {
                                    threads.length > 0 ?
                                    threads.map((thread, index) => {
                                        return (
                                            <tr style={{cursor: "pointer"}} key={index}>
                                                <td id={thread.thread_id}
                                                    onClick={handleThreadChange}>{index + 1}</td>
                                                <td id={thread.thread_id}
                                                    onClick={handleThreadChange}> {`${thread.f_name} ${thread.l_name}`} </td>
                                                <td id={thread.thread_id}
                                                    onClick={handleThreadChange}> {thread.email} </td>
                                                <td id={thread.thread_id}
                                                    onClick={handleThreadChange}> {thread.topic} </td>
                                                <td id={thread.thread_id}
                                                    onClick={handleThreadChange}>{thread.creation_date}</td>
                                            </tr>
                                        )
                                    }) :
                                    <Row className={"d-flex justify-content-center h-100 align-items-center"}>
                                        <h5> Nie znaleziono wątków </h5>
                                    </Row>
                                }
                                </tbody>
                            </Table>
                        </Row>
                        <Row className={"pagination-element d-flex justify-content-center pt-2 pb-2"}>
                            <Pagination count={pagesTotal} page={page} color={"primary"} onChange={handlePage}/>
                        </Row>
                    </React.Fragment>
            }
        </React.Fragment>
    )
}

export default GuideActiveOfferThreadList