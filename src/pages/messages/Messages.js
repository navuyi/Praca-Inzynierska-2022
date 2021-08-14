
// Components
import NavbarComponent from "../../components/NavbarComponent";
import Footer from "../../components/Footer";
import SideNavbar from "../../components/SideNavbar";
import SideNavbarLink from "../../components/SideNavbarLink";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Route, Switch} from "react-router-dom";
import NewMessage from "./NewMessage";
import OldMessages from "./OldMessages";
import SentMessages from "./SentMessages";
import DeletedMessages from "./DeletedMessages";
// Dependencies
import Select from "react-select";
import MessagesThreadList from "../../components/Messages/MessagesThreadList";
import React, {useState} from "react";


function Messages(){
    const [threadType, setThreadType] = useState({
        active: true,
        deleted: false
    })

    return(
        <div className="messages">
            <NavbarComponent />
            <Container fluid className={"h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
                <Row style={{minHeight: "75vh"}}>
                    <Col lg={2} sm={12} style={{padding: "0", backgroundColor: "orange"}}>
                        <SideNavbar title="Wiadomości">
                            <Button className={"w-100 mt-2 p-3"} variant={threadType.active ? "dark" : "light"} onClick={()=>setThreadType({active: true, deleted: false})}> Aktywne </Button>
                            <Button className={"w-100 mt-2 p-3"} variant={threadType.deleted ? "dark" : "light"} onClick={()=>setThreadType({active: false, deleted: true})}> Usunięte </Button>
                        </SideNavbar>
                    </Col>
                    <Col lg={10} sm={12} style={{padding: "0"}} >
                        <Container className={"h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
                            <Row className={"thread-list-header d-flex justify-content-center mt-5"}>
                                <h1> {threadType.active ? "Aktywne wątki " : null}  {threadType.deleted ? "Usunięte wątki" : null}</h1>
                            </Row>
                            <MessagesThreadList />
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default Messages;