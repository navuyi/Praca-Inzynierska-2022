import React, {useEffect, useState} from "react";
import {Container, Row, Col, Button, Form} from "react-bootstrap"
import GuideActiveOfferHeader from "../../../components/GuideOffers/GuideActiveOfferHeader";
import GuideActiveOfferMessagesList from "../../../components/GuideOffers/GuideActiveOfferMessagesList";
import GuideActiveOfferMessenger from "../../../components/GuideOffers/GuideActiveOfferMessenger";
import axios from "axios";
import {useParams} from "react-router-dom"
import {API_PREFIX} from "../../../config";



function GuideActiveOfferMessages(props){
    const [msgVisible, setMsgVisible] = useState(true)
    const {tourID} = useParams()


    const [threads, setThreads] = useState()

    useEffect(() => {
        fetchThreads()
    }, [])


    function fetchThreads(){
        const url = API_PREFIX+"/messages/guide/offer/threads"
        const token = localStorage.getItem("access_token")
        const params = {
            tour_id: tourID
        }
        console.log(params)
    }

    return(
        <div className={"guideActiveOfferMessages "}>
            <Container>
                <GuideActiveOfferHeader
                    header={props.general_data ? props.general_data.header : ""}
                    price={props.general_data ? props.general_data.price : ""}
                    person_limit={props.general_data ? props.general_data.person_limit : ""}
                    start_date={props.general_data ? props.general_data.start_date : ""}
                    end_date={props.general_data ? props.general_data.end_date : ""}
                    image_url={props.image_url ? props.image_url : ""}
                />
                <Row className={"mt-5 d-flex flex-column"}>
                    <h1 className={"list-header"}> Wiadomości </h1>
                </Row>
                <GuideActiveOfferMessagesList

                />
                {
                    msgVisible ?
                        <GuideActiveOfferMessenger

                        />  : null
                }

            </Container>
        </div>
    )
}

export default GuideActiveOfferMessages