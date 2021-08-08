import React, {useState} from "react";
import {Container, Row, Col, Button, Form} from "react-bootstrap"
import GuideActiveOfferHeader from "../../../components/GuideOffers/GuideActiveOfferHeader";
import GuideActiveOfferMessagesList from "../../../components/GuideOffers/GuideActiveOfferMessagesList";
import GuideActiveOfferMessenger from "../../../components/GuideOffers/GuideActiveOfferMessenger";

function GuideActiveOfferMessages(){
    const [msgVisible, setMsgVisible] = useState(true)

    return(
        <div className={"guideActiveOfferMessages "}>
            <Container>
                <GuideActiveOfferHeader

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