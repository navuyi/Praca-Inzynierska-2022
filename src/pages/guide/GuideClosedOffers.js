import React, {useEffect, useState} from "react"
import {Row, Col, Container, Form, Table} from "react-bootstrap"
import {CircularProgress} from "@material-ui/core";
import {API_PREFIX} from "../../config";
import axios from "axios";
import {refesh_token} from "../../API_CALLS/api_authentication_token_refresh";
import {Pagination} from "@material-ui/lab";
import {limitText} from "../../utils/limitText";

function GuideClosedOffers() {
    const [sort, setSort] = useState("most_recent")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [offers, setOffers] = useState([])

    useEffect(() => {
        fetchOffers()
    }, [])

    useEffect(() => {
        fetchOffers()
    }, [sort, page])

    function fetchOffers() {
        const url = API_PREFIX + "/guide/tours/closed"
        const access_token = localStorage.getItem("access_token")
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            params: {
                sort: sort,
                page: page
            }
        }
        setLoading(true)
        axios.get(url, config).then(res => {
            console.log(res)
            //setOffers(res.data.offers)
            setLoading(false)
            setTotalPages(res.data.total_pages)
        }).catch(err => {
            if (err.response) {
                if (err.response.status === 401) {
                    refesh_token().then(res => {
                        localStorage.setItem("access_token", res.data.access_token)
                        fetchOffers()
                    }).catch(err => {
                        setLoading(false)
                        console.log(err)
                    })
                }
            }
            console.log(err)
        })
    }

    return (
        <div className="guideClosedOffers">
            <Container className={"d-flex flex-column h-100"}>
                <Row className={"header-tab d-flex justify-content-around flex-column align-items-center flex-lg-row"}>
                    <Col xl={3} xs={8}>
                        <label> Sortowanie </label>
                        <Form.Control as={"select"} className={"w-100"} value={sort}
                                      onChange={(e) => setSort(e.target.value)}>
                            <option value="most_recent">Od najnowszych</option>
                            <option value="oldest">Od najstarszych</option>
                        </Form.Control>
                    </Col>
                    <Col xl={3} xs={8}>

                    </Col>
                    <Col xl={3} xs={8}>

                    </Col>
                </Row>
                {
                    loading ?
                        <Row className={"d-flex flex-column justify-content-center align-items-center mt-5"}
                             style={{minHeight: "400px"}}>
                            <CircularProgress size={100} color={"secondary"}/>
                        </Row> : null
                }
                {
                    offers.length === 0 && loading === false ?
                        <Row className={"d-flex flex-column justify-content-center align-items-center mt-5"}
                             style={{minHeight: "400px"}}>
                            <h3 className={"text-center w-100"}> Historia ofert jest pusta </h3>
                        </Row> : null
                }
                {
                    offers.length > 0 && loading === false ?
                        <Row className={"d-flex flex-column justify-content-start align-items-center mt-5"}
                             style={{minHeight: "400px"}}>
                            <Table>
                                <thead>
                                <tr>
                                    <th> ID</th>
                                    <th> Nagłówek</th>
                                    <th> Czas trwania</th>
                                    <th> Koniec zapisów</th>
                                    <th> Uczestnicy</th>
                                    <th> Cena</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    offers.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{limitText(item.header, 48)}</td>
                                                <td>{item.start_date} {" - "} {item.end_date}</td>
                                                <td>{item.enrollment_deadline}</td>
                                                <td>{item.tickets}</td>
                                                <td>{item.price}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>

                        </Row> : null
                }
                {
                    offers.length > 0 && loading === false ?
                        <Row className={"d-flex flex-column justify-content-center align-items-center"}>
                            <Pagination page={page} count={totalPages} shape={"rounded"} color={"secondary"}
                                        onChange={(event, value) => {
                                            setPage(value)
                                        }}/>
                        </Row> : null
                }

            </Container>
        </div>
    )
}

export default GuideClosedOffers