import React from "react";
import {Container, Row, Col, Button, Form} from "react-bootstrap"
import GuideActiveOfferHeader from "../../../components/GuideOffers/GuideActiveOfferHeader";
import GuideActiveOfferMessagesList from "../../../components/GuideOffers/GuideActiveOfferMessagesList";
import GuideActiveOfferMessenger from "../../../components/GuideOffers/GuideActiveOfferMessenger";

function GuideActiveOfferMessages(){
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
                <GuideActiveOfferMessenger

                />
            </Container>
        </div>
    )
}

export default GuideActiveOfferMessages