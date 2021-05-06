import {useHistory} from 'react-router-dom';
import {Container, Row, Col, Button, Form} from "react-bootstrap";

import person from '../images/icons/person.png';
import padlock from '../images/icons/padlock.png';


import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";

function Login(){
    return(
        <div className="login">
            <NavbarComponent />
            <Container  className={"cont col-xl-3 col-lg-5 col-md-8 d-flex flex-column align-items-center"}>
                <Row className={"d-flex justify-content-lg-center"} >
                    <h1>Logowanie</h1>
                </Row>
                <Row className={"d-flex flex-column col-xl-9 col-lg-10 col-md-9  col-10"}>
                    <Form.Control
                        size="lg"
                        type="email"
                        placeholder="Adres email"
                    />
                </Row>
                <Row className={"d-flex flex-column mt-5 col-xl-9 col-lg-10 col-md-9 col-10"}>
                    <Form.Control
                        size="lg"
                        type="password"
                        placeholder="Hasło"
                    />
                </Row>
                <Row className={"d-flex flex-column mt-5 col-xl-9 col-lg-10 col-md-9 col-10"}>
                    <Button className="mt-5 w-100" size={"lg"} variant="outline-dark"> Zaloguj </Button>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default Login