import React, {useState} from "react"
import NavbarComponent from "../components/ReusableComponents/NavbarComponent";
import Footer from "../components/ReusableComponents/Footer";
import {Container, Row, Col, Button} from "react-bootstrap"
import {CircularProgress} from "@material-ui/core";

import success from "../images/icons/success.svg"
import error from "../images/icons/exclamation.svg"
import {useHistory, useParams} from "react-router-dom";

function RegisterConfirm(){
    const history = useHistory()
    const [sending, setSending] = useState(false)
    const [process, setProcess] = useState({
        done: true,
        success: false
    })
    const {token} = useParams()
    const [responseMsg, setResponseMsg] = useState("")
    console.log(token)

    return(
        <div class={"registerConfirm"}>
            <NavbarComponent/>
            <Container fluid className={"h-100 d-flex flex-column justify-content-center align-items-center"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
                {
                    sending ?
                        <React.Fragment>
                            <h3 className={"loading-header"}> Trwa weryfikacja </h3>
                            <CircularProgress size={100} color={"secondary"}/>
                        </React.Fragment>
                         :
                        <React.Fragment>
                            {
                                process.done === true && process.success === true ?
                                    <Row className={"success-panel d-flex flex-column align-items-center justify-content-center"}>
                                        <img src={success} alt={""} width={150} />
                                        <h1> Witamy! </h1>
                                        <p> {responseMsg} </p>
                                        <Button className={"w-100 btn-success mt-5"} onClick={()=>history.push("/login")}> Przejdź do logowania </Button>
                                    </Row>
                                : null
                            }
                            {
                                process.done === true && process.success === false ?
                                    <Row className={"error-panel d-flex flex-column align-items-center justify-content-center"}>
                                        <img src={error} alt={""} width={150} />
                                        <h1> Niepowodzenie </h1>
                                        <p> {responseMsg} </p>
                                    </Row>
                                : null
                            }
                        </React.Fragment>
                }
            </Container>
            <Footer/>
        </div >
    )
}
export default RegisterConfirm