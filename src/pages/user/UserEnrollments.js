import React, {useEffect, useState} from "react"
import {Button, Col, Container, Row} from "react-bootstrap";
import img from "../../images/home/tour03.jpg"
import {API_PREFIX} from "../../config";
import axios from "axios";
import {refesh_token} from "../../API_CALLS/api_authentication_token_refresh";
import {CircularProgress} from "@material-ui/core";


function UserEnrollments() {
    const [enrollments, setEnrollments] = useState([])
    const [loading, setLoading] = useState(true)
    const [payment, setPayment] = useState({})

    useEffect(() => {
        fetchEnrollments()
    }, [])

    function fetchEnrollments(){
        const url = API_PREFIX+"/user/enrollments"
        const access_token = localStorage.getItem("access_token")
        const config = {
            headers:{
                Authorization: `Bearer ${access_token}`
            }
        }
        setLoading(true)
        axios.get(url, config).then(res => {
            setEnrollments(res.data)
            setLoading(false)
            console.log(res.data)
        })
        .catch(err => {
            if(err.response.status === 401){
                refesh_token().then(res => {
                    localStorage.setItem("access_token", res.data.access_token)
                    fetchEnrollments()
                })
            }
        })
    }
    useEffect(() => {
        if(payment.tour_id && payment.enrollment_id){
            fillPayment()
        }
    }, [payment])

    function handlePaymentClick(e){
        const enrollment_id = e.target.getAttribute("enrollment")
        const tour_id = e.target.getAttribute("tour")
        setPayment({
            enrollment_id: enrollment_id,
            tour_id: tour_id
        })
    }
    function fillPayment(){
        const url = API_PREFIX + "/payment/fill"
        const access_token = localStorage.getItem("access_token")
        const data = {...payment}
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
        axios.post(url, data, config).then(res => {
            console.log(res)
            window.location.href = res.data.url
        }).catch(err => {
            console.log(err.response)
            if(err.response.status === 401){
                refesh_token().then(res => {
                    localStorage.setItem("access_token", res.data.access_token)
                    fillPayment()
                })
            }
        })
    }

    return (
        <div className={"userEnrollments"}>
            <Container className={"h-100"} style={{marginTop: "0", top: "0", flexGrow: "1"}}>
                <Row className={"header d-flex justify-content-center"}>
                    <h1> Twoje aktywne wycieczki </h1>
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
                                    enrollments.length === 0 ? <Row className={"d-flex justify-content-center mt-5"}> <h4> Brak aktywnych wycieczek </h4> </Row> : null
                                }
                            </React.Fragment>
                        }
                        {
                            enrollments.map((item, index) => {
                                return(
                                    <Row className={"enrollment-panel"} key={index}>
                                        <Col xl={5}>
                                            <img id={"tour-img"} src={item.image_url} alt={""} />
                                        </Col>
                                        <Col xl={7} className={"d-flex flex-column align-items-start justify-content-start pl-5 pt-3  pt-xl-0"}>
                                            <Row className={"d-flex flex-row justify-content-between align-items-center w-100"}>
                                                <h2> {item.header} </h2>
                                            </Row>
                                            <Row className={"flex-grow-1 d-flex flex-column justify-content-center mt-2 mt-xl-0"} >
                                                <p>Przewodnik: {`${item.guide_f_name} ${item.guide_l_name}`}</p>
                                                <p> Data: {`${item.start_date} - ${item.end_date}`}</p>
                                                <p> Status płatności: <span style={{color: item.payment_status_msg === "Zapłacono" ? "green" : "red"}}>{item.payment_status_msg}</span></p>
                                                {
                                                    item.payment_status === "partial" || item.payment_status === "awaiting" ? <Button tour={item.tour_id} enrollment={item.enrollment_id} variant={"danger"} className={""} onClick={handlePaymentClick}> Dokonaj płatności </Button> : null
                                                }
                                            </Row>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserEnrollments