import React, {useEffect, useState} from "react"
import {Container, Row, Col, Button, Form} from "react-bootstrap"
import GuideActiveTourPanel from "../../components/GuideTours/GuideActiveTourPanel";
import axios from "axios";
import {API_PREFIX} from "../../config";
import {refesh_token} from "../../API_CALLS/token_refresh";
import {CircularProgress} from "@material-ui/core";

function GuideActiveOffers(){
    const [sort, setSort] = useState("most_recent")
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(()=>{
        fetchData()
    }, [])
    useEffect(()=>{
        setData([])
        fetchData()
    }, [sort])
    function fetchData(){
        setLoading(true)
        const url = API_PREFIX + "/guide/tours/active"
        const access_token = localStorage.getItem("access_token")
        const params = {
            sort: sort
        }
        axios.get(url, {
            params,
            headers:{
                Authorization: `Bearer ${access_token}`
            }
        })
        .then(res => {
            console.log(res)
            setData(res.data.tours_data)
            setLoading(false)
        })
        .catch(err => {
            if(err.response.status === 401){
                refesh_token().then(res=>{
                    localStorage.setItem("access_token", res.data.access_token)
                    fetchData()
                })
            }
        })
    }

    return(
        <div className="guideActiveOffers">
            <Container className={"d-flex flex-column h-100"}>
                <Row className={"header-tab d-flex justify-content-around flex-column align-items-center flex-lg-row"}>
                    <Col xl={3} xs={8}>
                        <label> Sortowanie </label>
                        <Form.Control as={"select"} className={"w-100"} value={sort} onChange={(e)=>setSort(e.target.value)}>
                            <option value="most_recent">Od najnowszych</option>
                            <option value="oldest">Od najstarszych</option>
                        </Form.Control>
                    </Col>
                    <Col xl={3} xs={8}>
                    {/*
                        <label> Data początkowa </label>
                        <Form.Control
                        type="date"
                        />
                    */}
                    </Col>
                    <Col xl={3} xs={8}>
                    {/*
                        <label> Data końcowa </label>
                        <Form.Control
                            type="date"
                        />
                     */}
                    </Col>
                </Row>
                <Row className={"d-flex flex-column align-items-center justify-content-center mt-5"} style={{flexGrow: "1"}}>
                    {
                        loading ? <CircularProgress size={100} color={"secondary"}/> :
                            data.map((tour, index) => {
                                return(
                                    <GuideActiveTourPanel
                                        key={index}
                                        header={tour.header}
                                        person_limit={tour.person_limit}
                                        price={tour.price}
                                        start_date={tour.start_date}
                                        end_date={tour.end_date}
                                        creation_date={tour.creation_date}
                                        image_url={tour.image_url}
                                    />
                                )
                            })
                    }
                </Row>
            </Container>
        </div>
    )
}

export default GuideActiveOffers