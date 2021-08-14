// Components
import NavbarComponent from "../../components/ReusableComponents/NavbarComponent";
import Footer from "../../components/ReusableComponents/Footer";
import SideNavbar from "../../components/ReusableComponents/SideNavbar";
import {Button, Col, Container, Row} from "react-bootstrap";

// Dependencies
import MessagesThreadList from "../../components/Messages/MessagesThreadList";
import React, {useState} from "react";
import Messenger from "../../components/ReusableComponents/Messenger";


function Messages() {
    const [threadType, setThreadType] = useState({
        active: true,
        deleted: false
    })
    const [msgVisible, setMsgVisible] = useState(false)
    const [threadId, setThreadId] = useState()
    const [interlocutorID, setInterlocutorID] = useState()
    const [interlocutor, setInterlocutor] = useState("")
    const [topic, setTopic] = useState("")
    const [sentDate, setSentDate] = useState("")

    return (
        <div className="messages">
            <NavbarComponent/>
            <Container fluid className={"h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
                <Row style={{minHeight: "75vh"}}>
                    <Col lg={2} sm={12} style={{padding: "0", backgroundColor: "orange"}}>
                        <SideNavbar title="Wiadomości">
                            <Button className={"w-100 mt-2 p-3"} variant={threadType.active ? "dark" : "light"}
                                    onClick={() => setThreadType({active: true, deleted: false})}> Aktywne </Button>
                            <Button className={"w-100 mt-2 p-3"} variant={threadType.deleted ? "dark" : "light"}
                                    onClick={() => setThreadType({active: false, deleted: true})}> Usunięte </Button>
                        </SideNavbar>
                    </Col>
                    <Col lg={10} sm={12} style={{padding: "0"}}>
                        <Container className={"h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
                            <Row className={"thread-list-header d-flex justify-content-center mt-5"}>
                                <h1> {threadType.active ? "Aktywne wątki " : null} {threadType.deleted ? "Usunięte wątki" : null}</h1>
                            </Row>
                            <MessagesThreadList
                                setThreadId={setThreadId}
                                setMsgVisible={setMsgVisible}
                                setInterlocutor={setInterlocutor}
                                setSentDate={setSentDate}
                                setTopic={setTopic}
                                setInterlocutorID={setInterlocutorID}
                            />
                            {
                                msgVisible ?
                                    <Messenger
                                        interlocutor={interlocutor}
                                        setMsgVisible={setMsgVisible}
                                        thread_id={threadId}
                                        topic={topic}
                                        sentDate={sentDate}
                                        interlocutor_id={interlocutorID}
                                    /> :
                                    null
                            }

                        </Container>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default Messages;