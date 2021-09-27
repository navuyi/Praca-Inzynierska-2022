import React from "react"
import {Container, Row, Col, FormLabel, FormControl} from "react-bootstrap"


function UserPaymentHistory(){
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
                        >
                            <option value={"most_recent"}>Od najnowszych</option>
                            <option value={"oldest"}> Od najstarszych </option>
                        </FormControl>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserPaymentHistory