import React, {useState} from "react"
import {Button, Col, FormControl, Row, Table, DropdownButton, FormLabel} from "react-bootstrap"

// Import icons
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import PaymentIcon from '@material-ui/icons/Payment'
import ReceiptIcon from '@material-ui/icons/Receipt';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import DropdownItem from "react-bootstrap/DropdownItem";
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

import api_messages_unicast_new from "../../API_CALLS/api_messages_unicast_new";
import {useHistory, useParams} from "react-router-dom";
import {refesh_token} from "../../API_CALLS/api_authentication_token_refresh";

import {_logout} from "../../utils/_logout";
import {useDispatch} from "react-redux";
import {CircularProgress} from "@material-ui/core";
import NotFoundIndicator from "../ReusableComponents/NotFoundIndicator";
import {limitText} from "../../utils/limitText";


function GuideActiveOfferEnrollmentList(props) {
    const [dropdown, setDropdown] = useState(false)
    const [enrollmentDetails, setEnrollmentDetails] = useState(undefined)
    const [detailsID, setDetailsID] = useState(undefined)
    const [message, setMessage] = useState("")
    const [topic, setTopic] = useState("")
    const {tourID} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const [sending, setSending] = useState(false)


    function handleEnrollmentDetails(id) {
        const details = props.enrollments.find(enrollment => enrollment.id == id)
        setEnrollmentDetails(details)
        setDropdown(true)
        setDetailsID(id)
    }

    function sendMessage(e) {
        e.preventDefault()
        setSending(true)
        api_messages_unicast_new(message, tourID, enrollmentDetails.user_id, topic)
            .then(res => {
                setSending(false)
                setMessage("")
                setTopic("")
                window.location.reload()        // Bad solution but must be enough for now :/
            })
            .catch(err => {
                if(err.response){
                    if(err.response.status === 401){
                        refesh_token().then(res => {
                            localStorage.setItem("access_token", res.data.access_token)
                            sendMessage(new Event("submit"))
                        })
                        .catch(err =>{
                            history.push("/login")
                            _logout(dispatch)
                        })
                    }
                }
            })
    }

    return (
        <React.Fragment>
            {
            props.enrollments.length > 0 ?
            <Row>
                    <Table striped bordered hover className={"mb-0"}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Imię i nazwisko</th>
                            <th>Ilość</th>
                            <th> Data zapisu </th>
                            <th>Status płatności</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            props.enrollments.map((enrollment, index) => {
                                return (
                                    <tr id={enrollment.id} style={{cursor: "pointer"}} key={index}
                                        onClick={(e) => handleEnrollmentDetails(e.currentTarget.id)}>
                                        <td>{index + 1}</td>
                                        <td>{`${enrollment.f_name} ${enrollment.l_name}`}</td>
                                        <td>{enrollment.tickets}</td>
                                        <td>{enrollment.creation_date}</td>
                                        <td>{enrollment.payment_status}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
            </Row> :
            <NotFoundIndicator message={"Nikt jeszcze nie wykupił tej oferty."} />
            }
            {
                dropdown ?
                    <Row className={"mb-5 d-flex justify-content-end justify-content-xl-start"}
                         style={{backgroundColor: "whitesmoke", borderTop: "2px solid #222222"}}>
                        <Col xl={3} md={5} xs={10} className={"d-flex flex-column p-xl-5 justify-content-start mt-5 mt-xl-0"}>
                            <Row className={"d-flex align-items-center mb-3"}><PersonIcon fontSize={"large"}/>
                                <p>{`${enrollmentDetails.f_name} ${enrollmentDetails.l_name}`}</p></Row>
                            <Row className={"d-flex align-items-center mb-3"}><EmailIcon fontSize={"large"}/>
                                <p>{enrollmentDetails.email}</p></Row>
                            <Row className={"d-flex align-items-center mb-3"}><PhoneIcon
                                fontSize={"large"}/> {enrollmentDetails.phone_number}
                            </Row>
                        </Col>
                        <Col xl={3} md={5} xs={10} className={"d-flex flex-column p-xl-5 justify-content-start mt-5 mt-xl-0"}>
                            <Row className={"d-flex align-items-center mb-3"}>{enrollmentDetails.user_id ?
                                <CheckBoxIcon fontSize={"large"}/> : <IndeterminateCheckBoxIcon fontSize={"large"}/>}
                                <p>{enrollmentDetails.user_id ? "Użytkownik" : "Gość"}</p></Row>
                                <Row className={"d-flex align-items-center mb-3"}>
                                    <PaymentIcon fontSize={"large"}/>
                                    <p>Zapłacono</p>
                                </Row>
                                <Row className={"d-flex align-items-center mb-3"}><EventAvailableIcon
                                    fontSize={"large"}/> {enrollmentDetails.creation_date}
                                </Row>
                                <Row className={"d-flex align-items-center mb-3"}>
                                    <ReceiptIcon fontSize={"large"}/>
                                    <DropdownButton variant={"info"} title={"Biletów: " + enrollmentDetails.tickets}>
                                        {
                                            enrollmentDetails.participants.map((participant, index) => {
                                                return (
                                                    <DropdownItem key={index}> {participant} </DropdownItem>
                                                )
                                            })
                                        }
                                    </DropdownButton>
                                </Row>
                        </Col>
                        {
                            enrollmentDetails.user_id ?
                            <React.Fragment>
                                {
                                    sending ?
                                    <Col xl={6} className={"d-flex flex-column p-5 justify-content-center align-items-center"}>
                                        <CircularProgress size={80}/>
                                    </Col> :
                                    <Col xl={6} className={"d-flex flex-column p-5 justify-content-start"}>
                                        {
                                            enrollmentDetails.message_threads.length >0 ?
                                                <DropdownButton title={`Liczba konwersacji z tym klientem: ${enrollmentDetails.message_threads.length} `} className={"mb-3"} variant={"warning"}>
                                                    {
                                                        enrollmentDetails.message_threads.map((thread, index) => {
                                                            return(
                                                                <DropdownItem key={index} onClick={()=>{history.push(`/account/guide/active-offer/${tourID}/messages`)}}>
                                                                    {index+1+".  "+ limitText(thread.topic, 40)}
                                                                </DropdownItem>
                                                            )
                                                        })
                                                    }
                                                </DropdownButton>
                                                : null
                                        }

                                        <form onSubmit={sendMessage}>
                                            <FormControl
                                                as={"input"}
                                                rows={1}
                                                placeholder="Temat"
                                                value={topic}
                                                onChange={(e) => {
                                                    setTopic(e.target.value)
                                                }}
                                                required
                                                className={"mb-2"}
                                            />
                                            <FormControl
                                                as={"textarea"}
                                                rows={4}
                                                placeholder="Wiadomość"
                                                value={message}
                                                onChange={(e) => {
                                                    setMessage(e.target.value)
                                                }}
                                                required
                                            />
                                            <Button variant={"dark"} className={"w-100 mt-2"} type={"submit"}><p>Wyślij</p>
                                            </Button>
                                        </form>
                                    </Col>
                                }
                                </React.Fragment>
                                 :
                                <Col xl={6}
                                     className={"d-flex flex-column p-5 justify-content-center  align-items-center"}>
                                    <p style={{fontSize: "0.9rem"}}> Ten klient nie ma konta w serwisie. Możliwy kontakt
                                        telefoniczny lub mailowy.</p>
                                </Col>
                        }
                    </Row>
                    : null
            }
        </React.Fragment>
    )
}

export default GuideActiveOfferEnrollmentList