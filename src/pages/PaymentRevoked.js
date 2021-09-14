import NavbarComponent from "../components/ReusableComponents/NavbarComponent";
import Footer from "../components/ReusableComponents/Footer";
import React from "react";
import {Container, Row, Col} from "react-bootstrap"

import icon from "../images/icons/cancelation.svg"

function PaymentRevoked() {
    return (
        <div className="paymentRevoked">
            <NavbarComponent/>
            <Container fluid className={"h-100 d-flex flex-column justify-content-center align-items-center"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
                <Row className={"d-flex align-items-center justify-content-center"}>
                    <img src={icon} alt={""} width={200}/>
                </Row>
                <Row className={"d-flex flex-column align-items-center mt-5"}>
                    <h1> Płatność nie została dokonana! </h1>
                    <h2> Twój zapis na ofertę pozostaje aktywny ale musi zostać opłacony w ciągu 3 dni!</h2>
                    <h3> Po tym czasie zostanie automatycznie usunięty. </h3>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default PaymentRevoked;