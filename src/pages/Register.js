import {Container, Row, Col} from "react-bootstrap";
import {Form, Button} from "react-bootstrap";



import {useState} from "react";
import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";


function Register(){

    const [credentials, setCredentials] = useState({
        f_name: "",
        l_name: "",
        email: "",
        password: "",
        password_repeat: "",
        phone_number: "",
    })
    const handleChange = e =>{
        const update = {...credentials, [e.target.id]: e.target.value}
        setCredentials(update);
        console.log(credentials)
    }

    return(
        <div className="register">
            <NavbarComponent />
                <Container className={"cont col-xl-4 col-lg-6 d-flex flex-column align-items-center"}>
                    <Row className={"d-flex justify-content-center"}>
                        <h1>Formularz rejestracyjny</h1>
                    </Row>
                    <Row className={"d-flex flex-column col-xl-6 col-10 col-lg-10 col-md-6"}>
                        <Form.Label> Imię </Form.Label>
                        <Form.Control
                            type="text"
                        />
                    </Row>
                    <Row className={"d-flex flex-column col-xl-6 col-10 col-lg-10 col-md-6"}>
                        <Form.Label> Nazwisko </Form.Label>
                        <Form.Control
                            type="text"
                        />
                    </Row>
                    <Row className={"d-flex flex-column col-xl-6 col-10 col-lg-10 col-md-6"}>
                        <Form.Label> Adres email </Form.Label>
                        <Form.Control
                            type="email"
                        />
                    </Row>
                    <Row className={"d-flex flex-column col-xl-6 col-10 col-lg-10 col-md-6"}>
                        <Form.Label> Hasło </Form.Label>
                        <Form.Control
                            type="password"
                        />
                    </Row>
                    <Row className={"d-flex flex-column col-xl-6 col-10 col-lg-10 col-md-6"}>
                        <Form.Label> Powtórz Hasło </Form.Label>
                        <Form.Control
                            type="password"
                        />
                    </Row>
                    <Row className={"d-flex justify-content-center col-lg-6 col-10 col-md-6"}>
                        <Button size={"lg"} className={"mt-5 w-100"} variant={"outline-dark"}> Zarejestruj </Button>
                    </Row>
                </Container>
            <Footer />
        </div>
    )
}

export default Register;