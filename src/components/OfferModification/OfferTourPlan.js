import React from "react"
import {Container, Row, Col, Button, FormControl, FormLabel, Form} from "react-bootstrap"
import {useState} from "react";



function OfferTourPlan(props){


    return(
        <React.Fragment>
            <Row className={"mt-5 col-xl-4"}>
                <h3 className={"m-0"}> Plan wycieczki</h3>
            </Row>
            <Row className={"mt-2 col-xl-4"}>
                <Form className={"w-100"}>
                    <FormControl
                        as={"textarea"}
                        type={"input"}
                    />
                    <Button className={"w-100 mt-2"}> Dodaj </Button>
                </Form>
            </Row>
            <Row className={"mt-2 col-xl-8"}>

            </Row>
        </React.Fragment>
    )
}

export default OfferTourPlan