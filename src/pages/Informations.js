import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";
import React from "react";
import {Container, Row, Col} from "react-bootstrap"

function Informations(){
    return(
        <div className="informations">
            <NavbarComponent />
            <Container fluid className={"h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
            </Container>
            <Footer />
        </div>
    )
}

export default Informations;