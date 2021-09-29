import React, {useEffect, useState} from "react"
import {Container, Row, Col, FormLabel, FormControl, Table} from "react-bootstrap"
import {API_PREFIX} from "../../config";
import axios from "axios";
import {refesh_token} from "../../API_CALLS/api_authentication_token_refresh";
import {Pagination} from "@material-ui/lab";
import {Link} from "react-router-dom"
import {CircularProgress} from "@material-ui/core";

function UserPaymentHistory(){
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState("most_recent")
    const [totalPages, setTotalPages] = useState(1)
    const [payments, setPayments] = useState([])
    const [loading, setLoading] = useState(true)

    const minHeight = "400px"

    useEffect(() => {
        fetchPayments()
    }, [])

    useEffect(() => {
        fetchPayments()
    }, [sort, page])

    function fetchPayments(){
        const url = API_PREFIX + "/user/payments/history"
        const access_token = localStorage.getItem("access_token")
        const config = {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            params: {
                page: page,
                sort: sort
            }
        }
        setLoading(true)
        axios.get(url, config).then(res => {
            console.log(res)
            setPayments(res.data.payments)
            setTotalPages(res.data.total_pages)

            setLoading(false)
        }).catch(err => {
            if(err.response){
                if(err.response.status === 401){
                    refesh_token().then(res => {
                        localStorage.setItem("access_token", res.data.access_token)
                        fetchPayments()
                    })
                }
                console.log(err)
            }
        })
    }

    return(
        <div className={"userPaymentHistory"}>
            <Container className={"h-100"} style={{marginTop: "0", top: "0", flexGrow: "1"}}>
                <Row className={"header d-flex justify-content-center align-items-center"}>
                    <Col xl={3}></Col>
                    <Col xl={6} className={"d-flex justify-content-center align-items-center"}>
                        <h1> Historia płatności </h1>
                    </Col>
                    <Col xl={3}>
                        <FormLabel style={{color: "whitesmoke"}}>Sortuj</FormLabel>
                        <FormControl
                            as={"select"}
                            className={"w-100"}
                            value={sort}
                            onChange={(e) => {
                                setSort(e.target.value)
                            }}
                        >
                            <option value={"most_recent"}>Od najnowszych</option>
                            <option value={"oldest"}> Od najstarszych </option>
                        </FormControl>
                    </Col>
                </Row>
                {
                    loading ?
                        <Row className={"d-flex justify-content-center align-items-center"} style={{minHeight: minHeight}}>
                            <CircularProgress size={85} />
                        </Row> :
                <Row className={"d-flex flex-column align-items-center justify-content-start mt-0"} style={{minHeight: minHeight}}>
                    {
                        payments.length > 0 ?
                    <Table >
                        <thead>
                        <tr>
                            <th> ID </th>
                            <th> Wartość [PLN] </th>
                            <th> Oferta </th>
                            <th> Data płatności </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            payments.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        <td> <b>{item.payment_id}</b> </td>
                                        <td> {item.amount_paid} </td>
                                        <td> <Link to={`/tours/tour/${item.tour_id}`}>{item.tour_header} </Link></td>
                                        <td> {item.created} </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table> :
                            <Row className={"d-flex justify-content-center align-items-center"} style={{minHeight: minHeight}}>
                                <h3> Historia płatności jest pusta </h3>
                            </Row>
                    }
                </Row>
                }
                {
                    payments.length > 0 ?
                        <Row className={"d-flex justify-content-center w-100"}>
                            <Pagination page={page} variant={"outlined"} shape={"rounded"}  count={totalPages} onChange={(e, value) => {
                                setPage(value)
                            }}/>
                        </Row> : null
                }

            </Container>
        </div>
    )
}

export default UserPaymentHistory