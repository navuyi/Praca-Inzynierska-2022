import React from "react"
import NavbarComponent from "../../components/NavbarComponent";
import Footer from "../../components/Footer";

import {Container, Row, Col} from "react-bootstrap"

function TourDetails(){
    return(
        <div className={"tourDetails"}>
            <NavbarComponent/>
            <Container fluid className={"h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>

            </Container>
            <Footer />
        </div>
    )
}

export default TourDetails;