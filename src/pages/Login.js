import {useHistory} from 'react-router-dom';
import {Container, Row, Col, Button} from "react-bootstrap";

import person from '../images/icons/person.png';
import padlock from '../images/icons/padlock.png';
import close from '../images/icons/close.png';
import mail from "../images/icons/mail.png";
import login_bg from '../images/login/login-bg.jpg';

function Login(){
    const history = useHistory();
    return(
        <div className="login">
            <Container fluid className={"login-panel col-lg-3 col-md-6 col-sm-6"} >
                <Row className={"d-flex justify-content-between align-items-center"} style={{marginBottom: "7em"}} >
                    <h2>Logowanie</h2>
                    <img src={close} alt="" className={"exit-img"} onClick={()=>history.goBack()}/>
                </Row>
                <Row className={"d-flex flex-column align-items-center mt-lg-5"}>
                    <div className="input-container">
                        <img src={person} alt={""}/>
                        <input
                            type="email"
                            placeholder="Adres email"
                        />
                    </div>
                    <div className="input-container">
                        <img src={padlock} alt={""}/>
                        <input
                            type="password"
                            placeholder="Hasło"
                        />
                    </div>
                    <button> Zaloguj </button>
                    <p>Nie masz konta? <span onClick={()=>history.push("/register")}>Załóż je!</span></p>
                </Row>
            </Container>
        </div>
    )
}

export default Login