import {Container, Row, Col} from "react-bootstrap";
import close from "../images/icons/close.png";

import {useHistory} from 'react-router-dom';



function Register(){
    const history = useHistory();

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
                        />
                    </fieldset>
                    <fieldset>
                        <legend> Nazwisko </legend>
                        <input
                            type="text"
                        />
                    </fieldset>
                    <fieldset>
                        <legend> Numer telefonu </legend>
                        <input
                            type="text"
                        />
                    </fieldset>
                    <fieldset>
                        <legend> Email </legend>
                        <input
                            type="text"
                        />
                    </fieldset>
                    <fieldset>
                        <legend> Hasło </legend>
                        <input
                            type="text"
                        />
                    </fieldset>
                    <fieldset>
                        <legend> Powtórz hasło </legend>
                        <input
                            type="text"
                        />
                    </fieldset>
                </Row>
                <Row >
                    <button> Zarejestruj </button>
                </Row>
            </Container>
        </div>
    )
}

export default Register;