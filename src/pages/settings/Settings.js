import React from "react"
import {Row, Col, Container, Button, FormControl} from "react-bootstrap"
import NavbarComponent from "../../components/ReusableComponents/NavbarComponent";
import SideNavbar from "../../components/ReusableComponents/SideNavbar";
import Footer from "../../components/ReusableComponents/Footer";
import SideNavbarLink from "../../components/ReusableComponents/SideNavbarLink";
import {Switch} from "react-router-dom"
import PasswordChange from "./PasswordChange";
import PersonalData from "./PersonalData";
import ProtectedRoute from "../../components/UtilityComponents/ProtectedRoute";

function Settings(props){
    return(
        <div className="settings">
            <NavbarComponent/>
            <Container fluid className={"h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
                <Row style={{minHeight: "75vh"}}>
                    <Col lg={2} sm={12} style={{padding: "0", backgroundColor: "orange"}}>
                        <SideNavbar title="Ustawienia">
                            <SideNavbarLink
                                name="Zmiana hasła"
                                path="/account/settings/password-change"
                            />
                            <SideNavbarLink
                                name="Dane personalne"
                                path="/account/settings/personal-data"
                            />
                        </SideNavbar>
                    </Col>
                    <Col lg={10} sm={12} style={{padding: "0"}}>
                        <Switch>
                            <ProtectedRoute component={PasswordChange} path="/account/settings/password-change"/>
                            <ProtectedRoute component={PersonalData} path="/account/settings/personal-data" />
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}


export default Settings
