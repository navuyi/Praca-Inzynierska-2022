import {Button, Container, Form, Row} from "react-bootstrap";
import React from "react"
import {api_authentication_register} from '../API_CALLS/api_authentication_register'

import {useState} from "react";
import NavbarComponent from "../components/ReusableComponents/NavbarComponent";
import Footer from "../components/ReusableComponents/Footer";
import {CircularProgress} from "@material-ui/core";
import ReCAPTCHA from "react-google-recaptcha";
import {RECAPTCHA_PUBLIC_KEY} from "../config";

function Register() {
    const [token, setToken] = useState("")
    const [sending, setSending] = useState(false)
    const [process, setProcess] = useState({
        done: false,
        success: false
    })
    const empty_credentials = {
        f_name: "",
        l_name: "",
        email: "",
        password: "",
        password_repeat: "",
        phone_number: "",
    }
    const [response, setResponse] = useState("")
    const [credentials, setCredentials] = useState(empty_credentials);

    const handleChange = e => {
        // Check if phone_number input is a number
        if (e.target.id == "phone_number") {
            const input = e.target.value;
            if (isNaN(input)) {
                return;
            }
        }
        const update = {...credentials, [e.target.id]: e.target.value}
        console.log(update);
        setCredentials(update);
        restoreDefault()
    }

    const restoreDefault = () => {
        setSending(false)
        setProcess({
            done: false,
            success: false
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        // Register account
        const data = {...credentials, token: token}
        console.log(data)
        setSending(true)
        api_authentication_register(data)
            .then(res => {
                if (res.status == 201) {
                    setResponse(res.data.message);
                    setSending(false)
                    setProcess({
                        done: true,
                        success: true
                    })
                    // Clear input fields and schedule redirect
                    setCredentials(empty_credentials);
                }
            })
            .catch(err => {
                setResponse(err.response.data.message)
                setSending(false)
                setProcess({
                    done: true,
                    success: false
                })
            })

    }

    return (
        <div className="register">
            <NavbarComponent/>
            <Container className={"cont col-xl-4 col-lg-6 d-flex flex-column align-items-center"}
                       style={{flexGrow: "1"}}>
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
                            onChange={(value) => {
                                setToken(value);
                            }}
                        />
                    </Row>
                    <Row className={"d-flex flex-column justify-content-center align-items-center mt-3"} style={{minHeight: "100px"}}>
                        {
                            token ?
                                <React.Fragment>
                                    {
                                        sending ? <CircularProgress size={80} /> :
                                            <React.Fragment>
                                                {
                                                    process.done === false ? <Button type="submit" size={"lg"} className={"w-100"} variant={"outline-dark"}> Zarejestruj </Button> : null
                                                }
                                                {
                                                    process.done === true && process.success === true && !sending ?
                                                        <p className={"response"}> {response} </p>
                                                        : null
                                                }
                                                {
                                                    process.done === true && process.success === false && !sending ?
                                                        <p className={"response"}> {response} </p>
                                                        : null
                                                }
                                            </React.Fragment>
                                    }
                                </React.Fragment>
                            : null
                        }
                    </Row>
                </Form>
            </Container>
            <Footer/>
        </div>
    )
}

export default Register;