import NavbarComponent from "../../components/NavbarComponent";
import Footer from "../../components/Footer";
import React from "react";
import {Container, Row, Col, Button} from "react-bootstrap"
import {Link} from "react-router-dom"

import confirm from "../../images/icons/success.svg"

function GuideNewTourSuccess(){
    return(
        <div className="guideNewTourSuccess">
            <NavbarComponent />
            <Container fluid className={"h-100 d-flex flex-column justify-content-center align-items-center pt-5 mb-5"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
                <Row>
                    <img src={confirm} alt={""} width={150}/>
                </Row>
                <Row className={"d-flex flex-column align-items-center mt-3"}>
                    <h1> Udało się!</h1>
                    <h2> Oferta wycieczki została pomyślnie utworzona </h2>
                </Row>
                <Row className={"mt-5"}>
                    <h3> Co chciałbys zrobić teraz?</h3>
                </Row>
                <Row className={"d-flex flex-column"}>
                    <Link to={"/account/guide/new-tour"}><Button variant={"outline-dark"}> Stwórz kolejną </Button></Link>
                    <Link to={"/account/guide/offers"}><Button variant={"outline-dark"}> Zobacz utworzone oferty </Button></Link>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default GuideNewTourSuccess