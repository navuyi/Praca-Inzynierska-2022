import React, {useEffect, useState} from "react"
import {Container, Row, Col, Button, Table} from "react-bootstrap"

import GuideActiveOfferHeader from "../../../components/GuideOffers/GuideActiveOfferHeader";
import GuideActiveOfferEnrollmentList from "../../../components/GuideOffers/GuideActiveOfferEnrollmentList";

function GuideActiveOfferEnrollment(props){


    const [clients, setClients] = useState(
        [
            {
                f_name: "Mark",
                l_name: "Twain",
                amount: 1,
                payment_status: "awaits",
                is_user: false
            },
            {
                f_name: "Joe",
                l_name: "Doe",
                amount: 4,
                payment_status: "done",
                is_user: true
            },
            {
                f_name: "Bob",
                l_name: "Marley",
                amount: 2,
                payment_status: "done",
                is_user: true
            },

    ])
    return(
        <div className={"guideActiveOfferEnrollment"}>
            <Container className={"h-100"} >
                {/*<-- This component returns its content in Row element */ }
                <GuideActiveOfferHeader
                    header={props.general_data ? props.general_data.header : ""}
                    price={props.general_data ? props.general_data.price : ""}
                    person_limit={props.general_data ? props.general_data.person_limit : ""}
                    start_date={props.general_data ? props.general_data.start_date : ""}
                    end_date={props.general_data ? props.general_data.end_date : ""}
                    image_url={props.image_url ? props.image_url : ""}
                />
                <Row className={"mt-5 d-flex flex-column"}>
                    <h1 className={"list-header"}> Lista zapisów </h1>
                </Row>
                <GuideActiveOfferEnrollmentList
                    clients={clients}
                />

            </Container>
        </div>
    )
}

export default GuideActiveOfferEnrollment