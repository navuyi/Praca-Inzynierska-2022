import React, {useEffect, useState} from "react"
import {Button, Col, Container, FormControl, FormLabel, Row} from "react-bootstrap";
import img from "../../images/home/tour03.jpg"
import {API_PREFIX} from "../../config";
import axios from "axios";
import {refesh_token} from "../../API_CALLS/api_authentication_token_refresh";
import {CircularProgress} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import {limitText} from "../../utils/limitText";

function UserEnrollmentsHistory() {
    const [loading, setLoading] = useState(false)
    const [history, setHistory] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pagesTotal, setPagesTotal] = useState(undefined)
    const [sort, setSort] = useState("most_recent")

    useEffect(() => {
        fetchHistory()
    }, [])

    useEffect(() => {
        fetchHistory()
    }, [currentPage, sort])

    function fetchHistory(){
        const url = API_PREFIX + "/user/enrollments/history"
        const token = localStorage.getItem("access_token")
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                page: currentPage,
                sort: sort
            }
        }
        setLoading(true)
        axios.get(url, config).then(res => {
            setLoading(false)
            console.log(res.data)
            setHistory(res.data.enrollments)
            setPagesTotal(res.data.total_pages)
        })
        .catch(err => {
            if(err.response){
                if(err.response.status === 401){
                    refesh_token().then(res => {
                        localStorage.setItem("access_token", res.data.access_token)
                        fetchHistory()
                    })
                }
                else{
                    setLoading(false)
                    console.log(err.response)
                }
            }
        })
    }


    return (
        <div className={"userEnrollmentsHistory"}>
            <Container className={"h-100"} style={{marginTop: "0", top: "0", flexGrow: "1"}}>
                <Row className={"header d-flex justify-content-center align-items-center"}>
                    <Col xl={3}></Col>
                    <Col xl={6} className={"d-flex justify-content-center align-items-center"}>
                        <h1> Twoja historia wycieczek </h1>
                    </Col>
                    <Col xl={3}>
                        <FormLabel style={{color: "whitesmoke"}}>Sortuj</FormLabel>
                        <FormControl
                            as={"select"}
                            className={"w-100"}
                            onChange={(e) => {
                                setSort(e.target.value)
                            }}
                        >
                        <option value={"most_recent"}>Od najnowszych</option>
                        <option value={"oldest"}> Od najstarszych </option>
                        </FormControl>
                    </Col>
                </Row>
                <Row className={"d-flex justify-content-center mb-5"}>
                    <Col xl={10}>
                        {
                            loading ?
                                <Row className={"d-flex justify-content-center mt-5 h-100"}>
                                    <CircularProgress size={100} />
                                </Row> :
                                <React.Fragment>
                                    {
                                        history.length === 0 ? <Row className={"d-flex justify-content-center mt-5"}> <h4> Historia wycieczek jest pusta </h4> </Row> : null
                                    }
                                </React.Fragment>
                        }
                        {
                            history.map((item, index) => {
                                return(
                                    <Row className={"panel"} key={index}>
                                        <Col xl={5}>
                                            <img id={"tour-img"} src={item.image_url} alt={""} />
                                        </Col>
                                        <Col xl={7} className={"d-flex flex-column align-items-start justify-content-start pl-5 pt-3  pt-xl-0"}>
                                            <Row className={"d-flex flex-row justify-content-between align-items-center w-100"}>
                                                <h2> {limitText(item.tour_header, 64)} </h2>
                                            </Row>
                                            <Row className={"flex-grow-1 d-flex flex-column justify-content-center mt-2 mt-xl-0"} >
                                                <p> Przewodnik: {`${item.guide_f_name} ${item.guide_l_name}`}</p>
                                                <p> Data: {item.tour_start_date} - {item.tour_end_date}</p>
                                                <p> Biletów: {item.participants.length}</p>
                                                <p> Miejsca: {item.places.map((item,index) => {
                                                    return(
                                                        item.place + " "
                                                    )
                                                })}</p>
                                            </Row>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                        {
                            history.length > 0 ?
                                <Row className={"d-flex justify-content-center mt-5"}>
                                    <Pagination count={pagesTotal} variant={"outlined"} color={"secondary"} page={currentPage} onChange={(e, value)=> {setCurrentPage(value)}}/>
                                </Row> : null
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserEnrollmentsHistory