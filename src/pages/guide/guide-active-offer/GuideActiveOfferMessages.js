import React from "react";
import {Container, Row, Col, Button, Form} from "react-bootstrap"
import GuideActiveOfferHeader from "../../../components/GuideOffers/GuideActiveOfferHeader";

function GuideActiveOfferMessages(){
    return(
        <div className={"guideActiveOfferMessages "}>
            <Container>
                <GuideActiveOfferHeader

                />
                <Row className={"mt-5"}>
                    <h1 className={'list-header'}> Lista wątków </h1>
                </Row>
            </Container>
        </div>
    )
}

export default GuideActiveOfferMessages