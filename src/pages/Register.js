import {Container, Row, Col} from "react-bootstrap";
import {Form, Button} from "react-bootstrap";

import {register_account} from '../API_CALLS/register_account'

import {useEffect, useRef, useState} from "react";
import {useHistory} from 'react-router-dom'
import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";
import {CircularProgress} from "@material-ui/core";
import ReCAPTCHA from "react-google-recaptcha";
import {RECAPTCHA_PUBLIC_KEY} from "../config";
function Register(){
    const [token, setToken] = useState("")

    const history = useHistory();
    const empty_credentials = {
        f_name: "",
        l_name: "",
        email: "",
        password: "",
        password_repeat: "",
        phone_number: "",
    }
    const [info_popup, setInfoPopup] = useState("");
    const [credentials, setCredentials] = useState(empty_credentials);
    const [redirect, setRedirect] = useState(false)
    const handleChange = e =>{
        // Check if phone_number input is a number
        if(e.target.id == "phone_number"){
            const input = e.target.value;
            if(isNaN(input)){
                setInfoPopup("Numer telefonu może zawierać tylko cyfry");
                return;
            }
        }
        const update = {...credentials, [e.target.id]: e.target.value}
        console.log(update);
        setCredentials(update);
    }



    const handleSubmit = e =>{
        e.preventDefault();

        // Check if passwords are the same
        if(credentials.password != credentials.password_repeat){
            setInfoPopup("Hasła muszą być takie same.")
            return;
        }

        // If OK clear info popup
        setInfoPopup("");

        // Register acount
        const data = {...credentials, token: token}
        console.log(data)
        register_account(data)
        .then(res=>{
            if(res.status == 201){
                setRedirect(true)
                setInfoPopup(res.data.message);

                // Clear input fields and schedule redirect
                setCredentials(empty_credentials);
                setTimeout(()=>{
                    history.push("/login")
                }, 2000)
            }
        })
        .catch(err=>{
            setInfoPopup(err.response.data.message)
        })

    }

    return(
        <div className="register">
            <NavbarComponent />
                <Container className={"cont col-xl-4 col-lg-6 d-flex flex-column align-items-center"} style={{flexGrow: "1"}}>
                    <Row className={"d-flex justify-content-center"}>
                        <h1>Formularz rejestracyjny</h1>
                    </Row>
                    <Form className={"col-xl-6 col-10 col-lg-10 col-md-6"} onSubmit={handleSubmit}>
                    <Row className={"d-flex flex-column"}>
                        <Form.Label> Imię </Form.Label>
                        <Form.Control
                            type="text"
                            value={credentials.f_name}
                            onChange={handleChange}
                            id="f_name"
                            required
                        />
                    </Row>
                    <Row className={"d-flex flex-column"}>
                        <Form.Label> Nazwisko </Form.Label>
                        <Form.Control
                            type="text"
                            value={credentials.l_name}
                            onChange={handleChange}
                            id="l_name"
                            required
                        />
                    </Row>
                    <Row className={"d-flex flex-column"}>
                        <Form.Label> Adres email </Form.Label>
                        <Form.Control
                            type="email"
                            value={credentials.email}
                            onChange={handleChange}
                            id="email"
                            required
                        />
                    </Row>
                    <Row className={"d-flex flex-column"}>
                        <Form.Label> Numer telefonu </Form.Label>
                        <Form.Control
                            type="text"
                            value={credentials.phone_number}
                            onChange={handleChange}
                            id="phone_number"
                            required
                        />
                    </Row>
                    <Row className={"d-flex flex-column"}>
                        <Form.Label> Hasło </Form.Label>
                        <Form.Control
                            type="password"
                            value={credentials.password}
                            onChange={handleChange}
                            id="password"
                            required
                        />
                    </Row>
                    <Row className={"d-flex flex-column"}>
                        <Form.Label> Powtórz Hasło </Form.Label>
                        <Form.Control
                            type="password"
                            value={credentials.password_repeat}
                            onChange={handleChange}
                            id="password_repeat"
                            required
                        />
                    </Row>
                    <Row className={"mt-3 d-flex justify-content-center"}>
                        <ReCAPTCHA
                            sitekey={RECAPTCHA_PUBLIC_KEY}
                            size={"normal"}
                            onChange={(value)=>{setToken(value);}}
                        />
                    </Row>
                    {
                        token ?
                            <Row className={"d-flex justify-content-center"}>
                            <Button type="submit" size={"lg"} className={"mt-5 mb-2 w-100"} variant={"outline-dark"}> Zarejestruj </Button>
                            <p>{info_popup}</p>
                        </Row> : null
                    }
                    <Row className={"d-flex justify-content-center align-items-center"}>
                        {redirect ? <CircularProgress /> : null}
                    </Row>
                    </Form>
                </Container>
            <Footer />
        </div>
    )
}

export default Register;