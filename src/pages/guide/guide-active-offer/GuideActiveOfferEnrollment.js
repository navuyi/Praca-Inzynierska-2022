import React, {useEffect, useState} from "react"
import {Container, Row} from "react-bootstrap"

import GuideActiveOfferHeader from "../../../components/GuideOffers/GuideActiveOfferHeader";
import GuideActiveOfferEnrollmentList from "../../../components/GuideOffers/GuideActiveOfferEnrollmentList";
import {useHistory, useParams} from "react-router-dom";
import {get_enrollments} from "../../../API_CALLS/api_enrollments_enrollment";
import {refesh_token} from "../../../API_CALLS/api_authentication_token_refresh";
import {_logout} from "../../../utils/_logout";
import {useDispatch} from "react-redux";

function GuideActiveOfferEnrollment(props) {
    const {tourID} = useParams()
    const [enrollments, setEnrollments] = useState([])
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        fetchEnrollments()
    }, [])

    function fetchEnrollments(){
        get_enrollments(tourID)
            .then(res => {
                console.log(res.data)
                setEnrollments(res.data)
            })
            .catch(err => {
                if(err.response){
                    if (err.response.status === 401){
                        refesh_token().then(res => {
                            localStorage.setItem("access_token", res.data.access_token)
                            fetchEnrollments()
                        })
                            .catch(err => {
                                history.push("/login")
                                _logout(dispatch)
                            })
                    }
                }
            })
    }

    return (
        <div className={"guideActiveOfferEnrollment"}>
            <Container className={"h-100"}>
                {/*<-- This component returns its content in Row element */}
                <GuideActiveOfferHeader
                    header={props.general_data ? props.general_data.header : ""}
                    price={props.general_data ? props.general_data.price : ""}
                    person_limit={props.general_data ? props.general_data.person_limit : ""}
                    start_date={props.general_data ? props.general_data.start_date : ""}
                    end_date={props.general_data ? props.general_data.end_date : ""}
                    image_url={props.image_url ? props.image_url : ""}
                    days_left={props.general_data ? props.general_data.days_left : ""}
                    time_left={props.general_data ? props.general_data.time_left : ""}
                    tickets={props ? props.tickets : ""}
                />
                <Row className={"mt-5 d-flex flex-column"}>
                    <h1 className={"list-header"}> Lista zapisów </h1>
                </Row>
                <GuideActiveOfferEnrollmentList
                    enrollments={enrollments}
                />

            </Container>
        </div>
    )
}

export default GuideActiveOfferEnrollment