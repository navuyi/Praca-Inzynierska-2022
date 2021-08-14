import NavbarComponent from "../components/ReusableComponents/NavbarComponent";
import Footer from "../components/ReusableComponents/Footer";
import React from "react";
import {Container} from "react-bootstrap"

function Informations() {
    return (
        <div className="informations">
            <NavbarComponent/>
            <Container fluid className={"h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
            </Container>
            <Footer/>
        </div>
    )
}

export default Informations;