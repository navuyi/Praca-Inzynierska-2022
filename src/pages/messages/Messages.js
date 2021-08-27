// Components
import NavbarComponent from "../../components/ReusableComponents/NavbarComponent";
import Footer from "../../components/ReusableComponents/Footer";
import SideNavbar from "../../components/ReusableComponents/SideNavbar";
import {Button, Col, Container, Row} from "react-bootstrap";

// Dependencies
import MessagesThreadList from "../../components/Messages/MessagesThreadList";
import React, {useEffect, useState} from "react";
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

    function handleThreadType(e){
        if(e.target.id === "active"){
            setThreadType({active: true, deleted: false})
        }
        else if(e.target.id === "deleted"){
            setThreadType({active: false, deleted: true})
        }
        setMsgVisible(false)
    }
    useEffect(() => {
        console.log(threadType)
    }, [threadType])
    return (
        <div className="messages">
            <NavbarComponent/>
            <Container fluid className={"h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
                <Row style={{minHeight: "75vh"}}>
                    <Col lg={2} sm={12} style={{padding: "0", backgroundColor: "orange"}}>
                        <SideNavbar title="Wiadomości">
                            <Button id={"active"} className={"w-100 mt-2 p-3"} variant={threadType.active ? "dark" : "light"} onClick={handleThreadType}> Aktywne </Button>
                            <Button id={"deleted"} className={"w-100 mt-2 p-3"} variant={threadType.deleted ? "dark" : "light"} onClick={handleThreadType}> Usunięte </Button>
                        </SideNavbar>
                    </Col>
                    <Col lg={10} sm={12} style={{padding: "0"}}>
                        <Container className={"h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
                            <MessagesThreadList
                                setThreadId={setThreadId}
                                setMsgVisible={setMsgVisible}
                                setInterlocutor={setInterlocutor}
                                setSentDate={setSentDate}
                                setTopic={setTopic}
                                setInterlocutorID={setInterlocutorID}
                                threadType={threadType}
                            />
                            {
                                msgVisible ?
                                    <React.Fragment>

                                        <Messenger
                                            interlocutor={interlocutor}
                                            setMsgVisible={setMsgVisible}
                                            thread_id={threadId}
                                            topic={topic}
                                            sentDate={sentDate}
                                            interlocutor_id={interlocutorID}
                                            threadType={threadType}
                                            setThreadType={setThreadType}
                                        />
                                    </React.Fragment>:
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