// Dependencies
import {Col, Row} from "react-bootstrap";

// Images
import person from '../../images/icons/person.png';
import mail from '../../images/icons/mail.png';

function Footer() {
    return (
        <Row className={"flex-row footer justify-content-lg-around  m-0 "}>
            <Col lg={3} className={"flex-column justify-content-center align-items-center"}>
                <div className="wrapper">
                    <img src={person} alt=""/>
                    <p> Rafał Figlus </p>
                </div>
                <div className="wrapper">
                    <img src={mail} alt=""/>
                    <p> figlusrafal@gmail.com </p>
                </div>
            </Col>
            <Col lg={3}>

            </Col>
            <Col lg={3}>

            </Col>
        </Row>
    )
}

export default Footer;