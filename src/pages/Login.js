import {useHistory} from 'react-router-dom';
import {Button, Container, Form, Row} from "react-bootstrap";
import isEmptyString from "../utils/isEmptyString";
import {useState} from "react";
import axios from "axios";
import NavbarComponent from "../components/ReusableComponents/NavbarComponent";
import Footer from "../components/ReusableComponents/Footer";
import {API_PREFIX} from "../config";
import {useDispatch} from "react-redux";
import {_login} from "../utils/_login";

function Login() {
    const history = useHistory();
    const dispatch = useDispatch()

    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleChange(e) {
        if (e.target.type === "email") {
            setEmail(e.target.value)
        } else if (e.target.type === "password") {
            setPassword(e.target.value)
        }
        setError("") // <-- Clear error after every email/password change
    }

    function submit(e) {
        e.preventDefault()
        // Check if email and password is provided
        if (isEmptyString(email) === true) {
            setError("Podaj adres email")
            return
        }
        if (isEmptyString(password) === true) {
            setError("Podaj hasło")
            return
        }
        const url = API_PREFIX + "/authentication/login"
        const data = {
            email: email,
            password: password
        }
        axios.post(url, data)
            .then(res => {
                if (res.status !== 200) {
                    setError("Coś poszło nie tak. Spróbuj ponownie.")
                    return
                }
                _login(res.data.access_token, res.data.refresh_token, res.data.user_id, res.data.is_guide, dispatch, history)
            })
            .catch(err => {
                const code = err.response.status
                console.log(code)
                if (code == 404 || code == 401) {
                    console.log(err.response.data.message)
                    setError(err.response.data.message)
                }
                // Clear credentials input
                //setPassword("")
                //setEmail("")
            })
    }

    return (
        <div className="login">
            <NavbarComponent/>
            <Container className={"cont col-xl-3 col-lg-5 col-md-8 d-flex flex-column align-items-center"}>
                <Row className={"d-flex justify-content-lg-center"}>
                    <h1>Logowanie</h1>
                </Row>
                <form onSubmit={submit}>
                    <Row className={"d-flex flex-column col-xl-9 col-lg-10 col-md-9  col-10"}>
                        <Form.Label> Adres email </Form.Label>
                        <Form.Control
                            size="lg"
                            type="email"
                            placeholder="Adres email"
                            onChange={handleChange}
                            required
                            value={email}
                        />
                    </Row>
                    <Row className={"d-flex flex-column mt-5 col-xl-9 col-lg-10 col-md-9 col-10"}>
                        <Form.Label> Hasło </Form.Label>
                        <Form.Control
                            size="lg"
                            type="password"
                            placeholder="Hasło"
                            onChange={handleChange}
                            required
                            value={password}
                        />
                    </Row>
                    <Row className={"d-flex flex-column mt-3 col-xl-9 col-lg-10 col-md-9 col-10"}>
                        <Button className="mt-5 w-100" size={"lg"} variant="dark" type={"submit"}> Zaloguj </Button>
                    </Row>
                </form>
                <Row className={"mt-4"}>
                    {
                        error ? <p className={"error-msg"}> {error} </p> :
                            <p> Nie masz konta? <span onClick={() => history.push("/register")}> Zarejestruj się.</span>
                            </p>
                    }
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default Login