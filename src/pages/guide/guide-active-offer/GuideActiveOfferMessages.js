import React, {useEffect, useState} from "react";
import {Container, Row, Col, Button, Form} from "react-bootstrap"
import GuideActiveOfferHeader from "../../../components/GuideOffers/GuideActiveOfferHeader";
import GuideActiveOfferMessagesList from "../../../components/GuideOffers/GuideActiveOfferMessagesList";
import GuideActiveOfferMessenger from "../../../components/GuideOffers/GuideActiveOfferMessenger";
import axios from "axios";
import {useHistory, useParams} from "react-router-dom"
import {API_PREFIX} from "../../../config";
import {refesh_token} from "../../../API_CALLS/token_refresh";


function GuideActiveOfferMessages(props){
    const [msgVisible, setMsgVisible] = useState(false)
    const [threadId, setThreadId] = useState()
    const {tourID} = useParams()

    useEffect(()=>{
        console.log(`Thread ID ${threadId}`)
        console.log(msgVisible)
    },[threadId, msgVisible])

    return(
        <div className={"guideActiveOfferMessages "}>
            <Container className={"mb-5"}>
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
                    setThreadId={setThreadId}
                    setMsgVisible={setMsgVisible}
                />
                {
                    msgVisible ?
                        <GuideActiveOfferMessenger
                            setMsgVisible={setMsgVisible}
                            threadId={threadId}
                        />  : null
                }

            </Container>
        </div>
    )
}

export default GuideActiveOfferMessages