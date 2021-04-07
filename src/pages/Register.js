import {Container, Row, Col} from "react-bootstrap";
import close from "../images/icons/close.png";

import {useHistory} from 'react-router-dom';
import {useState} from "react";


function Register(){
    const history = useHistory();
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
            <Container className={"register-panel col-lg-3 col-md-6 col-sm-6"}>
                <Row className={"d-flex justify-content-between align-items-center header-row"} style={{marginBottom: "5em"}} >
                    <h2>Rejestracja</h2>
                    <img src={close} alt="" className={"exit-img"} onClick={()=>history.goBack()}/>
                </Row>
                <Row className={"d-flex flex-column align-items-center"}>
                    <fieldset>
                        <legend> Imię </legend>
                        <input
                            type="text"
                            onChange={handleChange}
                            id="f_name"
                            value={credentials.f_name}
                        />
                    </fieldset>
                    <fieldset>
                        <legend> Nazwisko </legend>
                        <input
                            type="text"
                            onChange={handleChange}
                            id="l_name"
                            value={credentials.l_name}
                        />
                    </fieldset>
                    <fieldset>
                        <legend> Numer telefonu </legend>
                        <input
                            type="text"
                            onChange={handleChange}
                            id="phone_number"
                            value={credentials.phone_number}
                        />
                    </fieldset>
                    <fieldset>
                        <legend> Email </legend>
                        <input
                            type="email"
                            onChange={handleChange}
                            id="email"
                            value={credentials.email}
                        />
                    </fieldset>
                    <fieldset>
                        <legend> Hasło </legend>
                        <input
                            type="password"
                            onChange={handleChange}
                            id="password"
                            value={credentials.password}
                        />
                    </fieldset>
                    <fieldset>
                        <legend> Powtórz hasło </legend>
                        <input
                            type="password"
                            onChange={handleChange}
                            id="password_repeat"
                            value={credentials.password_repeat}
                        />
                    </fieldset>
                </Row>
                <Row className={"d-flex flex-column align-items-center m-5"}>
                    <button> Zarejestruj </button>
                </Row>
            </Container>
        </div>
    )
}

export default Register;