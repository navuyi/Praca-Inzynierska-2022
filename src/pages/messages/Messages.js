
// Components
import NavbarComponent from "../../components/NavbarComponent";
import Footer from "../../components/Footer";
import SideNavbar from "../../components/SideNavbar";
import SideNavbarLink from "../../components/SideNavbarLink";
import {Col, Container, Row} from "react-bootstrap";
import {Route, Switch} from "react-router-dom";
import NewMessage from "./NewMessage";
import OldMessages from "./OldMessages";
import SentMessages from "./SentMessages";
import DeletedMessages from "./DeletedMessages";
// Dependencies
import Select from "react-select";

function Messages(){

    return(
        <div className="messages">
            <NavbarComponent />
            <Container fluid style={{marginTop: "0em"}}>
                <Row>
                    <Col lg={2} sm={12} style={{padding: "0", backgroundColor: "orange"}}>
                        <SideNavbar title="Wiadomości">
                            <SideNavbarLink
                                name="Nowa wiadomość"
                                path="/account/messages/new_message"
                            />
                            <SideNavbarLink
                                name="Odebrane"
                                path="/account/messages/old_messages"
                            />
                            <SideNavbarLink
                                name="Wysłane"
                                path="/account/messages/sent_messages"
                            />
                            <SideNavbarLink
                                name="Usunięte"
                                path="/account/messages/deleted_messages"
                            />
                        </SideNavbar>
                    </Col>
                    <Col lg={10} sm={12} style={{padding: "0"}} >
                        <Switch>
                            <Route exact path="/account/messages/new_message">
                                <NewMessage />
                            </Route>
                            <Route exact path="/account/messages/old_messages">
                                <OldMessages />
                            </Route>
                            <Route exact path="/account/messages/sent_messages">
                                <SentMessages />
                            </Route>
                            <Route exact path="/account/messages/deleted_messages">
                                <DeletedMessages />
                            </Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default Messages;