import NavbarComponent from "../components/ReusableComponents/NavbarComponent";
import Footer from "../components/ReusableComponents/Footer";
import React from "react";
import {Container, Row, Col} from "react-bootstrap"

import icon from "../images/icons/credit-card.svg"

function PaymentSuccess() {
    return (
        <div className="paymentSuccess">
            <NavbarComponent/>
            <Container fluid className={"h-100 d-flex flex-column align-items-center justify-content-center"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
                <Row className={"d-flex justify-content-center align-items-center"}>
                    <img src={icon} alt={""} width={220}/>
                </Row>
                <Row className={"d-flex flex-column align-items-center mt-5"}>
                    <h1> Dziękujemy </h1>
                    <h2> Płatnośc przebiegła pomyślnie </h2>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default PaymentSuccess;