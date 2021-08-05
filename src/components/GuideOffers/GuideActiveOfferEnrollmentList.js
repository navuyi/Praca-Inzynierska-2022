import React, {useState} from "react"
import {Table, Container, Row, Col, FormControl, Button} from "react-bootstrap"

// Import icons
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CancelIcon from '@material-ui/icons/Cancel';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import PaymentIcon from '@material-ui/icons/Payment'
import ReceiptIcon from '@material-ui/icons/Receipt';

function GuideActiveOfferEnrollmentList(props){
    const [dropdown, setDropdown] = useState(true)
    const [clientID, setClientID] = useState(undefined)

    return(
        <React.Fragment>
        <Row style={{minHeight: "250px"}} >
            <Table striped bordered hover  className={"mb-0"}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Imię i nazwisko</th>
                    <th>Ilość</th>
                    <th>Status płatności</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.clients.map((client, index) => {
                        return(
                            <tr  style={{cursor: "pointer"}}>
                                <td>{index+1}</td>
                                <td>{`${client.f_name} ${client.l_name}`}</td>
                                <td>{client.amount}</td>
                                <td>{client.payment_status}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        </Row>
        {
            dropdown ?
                <Row className={"mb-5"} style={{backgroundColor: "whitesmoke", borderTop: "2px solid #222222"}}>
                    <Col xl={3} className={"d-flex flex-column p-xl-5 justify-content-start "}>
                        <Row className={"d-flex align-items-center mt-3"}><PersonIcon fontSize={"large"}/> <p>Bob Marley</p></Row>
                        <Row className={"d-flex align-items-center mt-3"}><EmailIcon fontSize={"large"}/> <p>bobm@gmail.com</p> </Row>
                        <Row className={"d-flex align-items-center mt-3"}><PhoneIcon fontSize={"large"}/> 646912887 </Row>
                    </Col>
                    <Col xl={3} className={"d-flex flex-column p-xl-5 justify-content-start"}>
                        <Row className={"d-flex align-items-center mt-3"}><CheckBoxIcon fontSize={"large"}/> <p>Użytkownik/Gość</p> </Row>
                        <Row className={"d-flex align-items-center mt-3"}><PaymentIcon fontSize={"large"}/> <p>Zapłacono</p> </Row>
                        <Row className={"d-flex align-items-center mt-3"}><ReceiptIcon fontSize={"large"}/> <p>Biletów: 4</p> </Row>
                    </Col>
                    <Col xl={6} className={"d-flex flex-column p-5 justify-content-start"}>
                        <FormControl
                            as={"textarea"}
                            rows={4}
                            placeholder="Wiadomość do tego klienta..."
                        />
                        <Button variant={"dark"} className={"w-100 mt-2"}> <p>Wyślij</p> </Button>
                    </Col>
                </Row>
                : null
        }
        </React.Fragment>
    )
}

export default GuideActiveOfferEnrollmentList