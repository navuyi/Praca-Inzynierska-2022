import React, {useEffect, useState} from "react";
import {Container, Row, Col, Button, Form} from "react-bootstrap"
import GuideActiveOfferHeader from "../../../components/GuideOffers/GuideActiveOfferHeader";
import GuideActiveOfferMessagesList from "../../../components/GuideOffers/GuideActiveOfferMessagesList";
import GuideActiveOfferMessenger from "../../../components/GuideOffers/GuideActiveOfferMessenger";
import {useHistory, useParams} from "react-router-dom"



function GuideActiveOfferMessages(props){
    const [msgVisible, setMsgVisible] = useState(false)
    const [threadId, setThreadId] = useState()
    const [interlocutor, setInterlocutor] = useState("")
    const [topic, setTopic] = useState("")
    const [sentDate, setSentDate] = useState("")
    const {tourID} = useParams()
    const [interlocutorID, setInterlocutorID] = useState()

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

                    setInterlocutor={setInterlocutor}
                    setSentDate={setSentDate}
                    setTopic={setTopic}
                    setInterlocutorID={setInterlocutorID}
                />
                {
                    msgVisible ?
                        <GuideActiveOfferMessenger
                            interlocutor={interlocutor}
                            setMsgVisible={setMsgVisible}
                            threadId={threadId}
                            topic={topic}
                            sentDate={sentDate}
                            interlocutorID={interlocutorID}
                        />  : null
                }

            </Container>
        </div>
    )
}

export default GuideActiveOfferMessages