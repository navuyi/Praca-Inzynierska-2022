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
    const [msgVisible, setMsgVisible] = useState(true)
    const {tourID} = useParams()
    const history = useHistory()

    const [threads, setThreads] = useState()

    useEffect(() => {
        fetchThreads()
    }, [])

    function fetchThreads(){
        const url = API_PREFIX+"/messages/guide/offer/threads"
        const access_token = localStorage.getItem("access_token")
        const config = {
            params: {
                tour_id: tourID
            },
            headers:{
                Authorization: `Bearer ${access_token}`
            }
        }
        axios.get(url, config)
            .then(res => {
                setThreads(res.data)
            })
            .catch(err => {
                if(err.response.status === 401){
                    refesh_token().then(res => {
                            localStorage.setItem("access_token", res.data.access_token)
                            fetchThreads()
                        })
                        .catch(err => {
                            history.push("/login")
                        })
                }
            })
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
                    threads={threads}
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