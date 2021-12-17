import NavbarComponent from "../components/ReusableComponents/NavbarComponent";
import Footer from "../components/ReusableComponents/Footer";
import React from "react";
import {Container, Row, Col} from "react-bootstrap"

import openbook from "../images/icons/open-book.png"

function Informations() {
    return (
        <div className="informations">
            <NavbarComponent/>
            <Container fluid className={"h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
                <Row className={"d-flex justify-content-center mt-5"}>
                    <img src={openbook} alt={""} width={128}/>
                </Row>
                <Row style={{color: "#222222"}} className={"mt-5 d-flex flex-column align-items-center"}>
                    <h3 style={{textAlign: "center", width: "100%"}}> Aplikacja webowa dla przewodników wycieczek turystycznych </h3>
                    <p style={{fontSize: "1.2rem", maxWidth: "50%", textAlign: "center", marginTop: "50px"}}>Niniejszy serwis jest zrealizowany w ramach pracy inżynierskiej o wyżej wymienionej tematyce.
                        Zaimplementowano system płatności przy użyciu zewnętrznego operatora płatności BitPay. Osoby z kontem przewodnika mają uprawnienia do ogranizowania i tworzenia ofert wycieczek, które są dostępne dla
                    klientów serwisu. Możliwe jest zarządzanie utworzonymi wycieczkami. W aplikacji istnieje wewnętrzny system korespondencji umożliwiający zalogowanym użytkownikom kontakt z przewodnikami.</p>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default Informations;